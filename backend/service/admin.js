var db = require("../dbconnection"); //reference of dbconnection.js
var transactionService = require("../service/transaction");
var util = require("../util");

const login = (username, password, callback) => {
  return db.query(
    `SELECT count(*) as count FROM admin WHERE username = ? AND password = ?`,
    [username, password],
    callback
  );
};

const getAllMember = callback => {
  return db.query(
    `SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,driving_license,
                  approved_at, approved_by,rejected_at,rejected_by,edited_at, driver_status
                  FROM members WHERE driver_status = 'pending'`,
    callback
  );
};

const getAllUser = callback => {
  return db.query(
    `SELECT id,username,firstname,lastname,phone_number,email,photo,
                  driver_status,driving_license,approved_at,approved_by,rejected_at,rejected_by,banned_at,banned_by
                  FROM members`,
    callback
  );
};

const driverApprove = (admin_name, approved_at, driver_id, callback) => {
  console.log("Approved by : ", admin_name);
  console.log("Member ID: ", driver_id);
  const driver_status = 1;
  return db.query(
    `UPDATE members SET approved_by = ?,approved_at = ? ,driver_status = ? WHERE id = ?`,
    [admin_name, approved_at, driver_status, driver_id],
    callback
  );
};

const BanMember = (admin_name, banned_at, member_id, callback) => {
  console.log('Banned by : ', admin_name);
  console.log('Member ID: ', member_id);
  return db.query(
    `UPDATE members SET banned_by = ?,banned_at = ? WHERE id = ?`,
    [admin_name, banned_at, member_id],
    callback
  );
};

const UnbanMember = (member_id, callback) => {
  console.log('Unban sucessful');
  return db.query(
    `UPDATE members SET banned_by = null,banned_at = null WHERE id = ?`,
    [member_id],
    callback
  );
};


const driverReject = (admin_name, rejected_at, driver_id, callback) => {
  console.log("Rejected by : ", admin_name);
  console.log("Member ID: ", driver_id);
  const driver_status = 3;
  return db.query(
    `UPDATE members SET rejected_by = ?, rejected_at = ? ,driver_status = ? WHERE id = ?`,
    [admin_name, rejected_at, driver_status, driver_id],
    callback
  );
};

function getCurrentDateTimeString() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date
      .getDate()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getSeconds()
      .toString()
      .padStart(2, "0")
  );
}

const getAllReport = callback => {
  return db.query(
    `SELECT report.id as id, 
                  report.topic as topic, 
                  report.comment as comment , 
                  report.created_at as created_at,
                  report.is_read as is_read, 
                  report.member_id as member_id, 
                  members.firstName as firstname, 
                  members.lastname as lastname, 
                  members.photo as photo , 
                  members.username as username
                  FROM report INNER JOIN members ON report.member_id = members.id`,
    callback
  );
};

const isRead = ({ id, is_read }, callback) => {
  return db.query(
    `UPDATE report 
                  SET is_read = ?
                  WHERE id = ?`,
    [is_read, id],
    callback
  );
};

const getAllTrip = (callback) => {
  return db.query(`SELECT trip.id as trip_id,
                  trip.owner as driver_id,
                  trip.start_datetime,
                  trip.status,
                  trip.car_brand, 
                  trip.plate_license, 
                  trip.price,
                  trip.created_at,
                  trip.departure_latitude,
                  trip.departure_longtitude ,
                  trip.departure_detail,
                  trip.destination_latitude,
                  trip.destination_longtitude ,
                  trip.destination_detail,
                  members.username,
                  members.firstname,
                  members.lastname,
                  members.photo
                  FROM trip INNER JOIN members ON trip.owner = members.id`,callback);
}

const getTripMember = (ID, callback) => {
  return db.query(`SELECT 
                          request.id AS request_id,
                          request.driver_departed_at,
                          request.driver_arrived_at,
                          request.departed_at,
                          request.request_status,
                          request.created_at AS request_at,   
                          request.paid_at,
                          request.departure_latitude,
                          request.departure_longtitude ,
                          request.departure_detail,
                          request.destination_latitude,
                          request.destination_longtitude ,
                          request.destination_detail,        
                          members.id AS member_id,
                          members.username,
                          members.firstname,
                          members.lastname,
                          members.photo
                          FROM request LEFT JOIN members ON request.member_id = members.id 
                          WHERE request.trip_id = ? `,[ID],callback);
};

const getWithdrawalRequest = callback => {
  return db.query(
    `SELECT withdrawal.id as id , 
            withdrawal.member_id as member_id, 
            withdrawal.amount as amount, 
            withdrawal.created_at as created_at, 
            withdrawal.account_name as account_name, 
            withdrawal.account_number as account_number, 
            withdrawal.bank_name as bank_name,
            members.username as username, 
            members.photo as photo, 
            members.amount as balance, 
            members.firstname as firstname, 
            members.lastname as lastname
    FROM withdrawal INNER JOIN members ON withdrawal.member_id = members.id where withdrawal.status = 'pending'`,
    callback
  );
};

const withdrawalApprove = async (
  admin_name,
  time,
  withdrawal_id,
  action,
  callback
) => {
  if (!action) {
    const status = "approved";
    const member = await util.promisifyQuery(
      `SELECT withdrawal.member_id, withdrawal.amount FROM withdrawal WHERE withdrawal.id = ?`,
      [withdrawal_id]
    );
    const { member_id, amount } = member[0];
    transactionService.createTransaction(-amount, member_id, time, "withdraw");
    const wallet_amount = await util.promisifyQuery(
      `SELECT members.amount FROM members WHERE members.id = ?`,
      [member_id]
    );
    const { amount: balance } = wallet_amount[0];
    const updated_amount = balance - amount;
    transactionService.updateWallet(updated_amount, member_id);
    return db.query(
      `UPDATE withdrawal SET approved_by = ?, approved_at = ?, status = ? WHERE id = ?`,
      [admin_name, time, status, withdrawal_id],
      callback
    );
  }
  if (action) {
    const status = "rejected";
    return db.query(
      `UPDATE withdrawal SET rejected_by = ?, rejected_at = ?, status = ? WHERE id = ?`,
      [admin_name, time, status, withdrawal_id],
      callback
    );
  }
};

module.exports = {
  login,
  getAllMember,
  getAllUser,
  driverApprove,
  getCurrentDateTimeString,
  driverReject,
  getAllReport,
  isRead,
  getWithdrawalRequest,
  withdrawalApprove,
  getAllTrip, 
  getTripMember,
  BanMember,
  UnbanMember
};
