var db = require('../dbconnection'); //reference of dbconnection.js

const login = (username, password, callback) => {
  return db.query(
    `SELECT count(*) FROM admin WHERE username = ? AND password = ?`,
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

const driverApprove = (admin_name, approved_at, driver_id, callback) => {
  return db.query(
    `UPDATE members SET approved_by = ?,approved_at = ? WHERE id = ?`,
    [admin_name, approved_at, driver_id],
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
module.exports = { login, getAllMember, driverApprove, getCurrentDateTimeString };
