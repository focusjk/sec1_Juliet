var db = require('../dbconnection'); //reference of dbconnection.js

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

const driverApprove = (admin_name, approved_at, driver_id, callback) => {
  console.log('Approved by : ', admin_name);
  console.log('Member ID: ', driver_id);
  const driver_status = 1;
  return db.query(
    `UPDATE members SET approved_by = ?,approved_at = ? ,driver_status = ? WHERE id = ?`,
    [admin_name, approved_at, driver_status, driver_id],
    callback
  );
};

const driverReject = (admin_name, rejected_at, driver_id, callback) => {
  console.log('Rejected by : ', admin_name);
  console.log('Member ID: ', driver_id);
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
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date
      .getDate()
      .toString()
      .padStart(2, '0') +
    ':' +
    date
      .getHours()
      .toString()
      .padStart(2, '0') +
    ':' +
    date
      .getMinutes()
      .toString()
      .padStart(2, '0') +
    ':' +
    date
      .getSeconds()
      .toString()
      .padStart(2, '0')
  );
}

const getAllReport = (callback) => {
  return db.query(`SELECT report.id as id, 
                  report.topic as topic, 
                  report.comment as comment , 
                  report.created_at as created_at,
                  report.is_read as is_read, 
                  report.member_id as member_id, 
                  members.firstName as firstname, 
                  members.lastname as lastname, 
                  members.photo as photo , 
                  members.username as username
                  FROM report INNER JOIN members ON report.member_id = members.id`,callback);
}

const isRead = ({ id, is_read }, callback) => {
  return db.query(`UPDATE report 
                  SET is_read = ?
                  WHERE id = ?`, [ is_read , id ] , callback);
}

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
                          members.id AS member_id,
                          members.username,
                          members.firstname,
                          members.lastname,
                          members.photo
                          FROM request LEFT JOIN members ON request.member_id = members.id 
                          WHERE request.trip_id = ? `,[ID],callback);
};

module.exports = { login, getAllMember, driverApprove, getCurrentDateTimeString, driverReject, getAllReport , isRead, getAllTrip, getTripMember };
