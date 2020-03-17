var db = require("../dbconnection"); //reference of dbconnection.js
var transactionService = require("../service/transaction");

const login = (username, password, callback) => {
  return db.query(
    `SELECT count(*) as count FROM admin WHERE username = ? AND password = ?`,
    [username, password],
    callback
  );
};

// YIN
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
    FROM withdrawal INNER JOIN members ON withdrawal.member_id = members.id`,
    callback
  );
};

const withdrawalApprove = (
  admin_name,
  time,
  withdrawal_id,
  member_id,
  amount,
  action,
  callback
) => {
  if (!action) {
    const status = "approved";
    transactionService.createTransaction(-amount, member_id, time, "withdraw");
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
  withdrawalApprove
};
