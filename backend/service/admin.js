var db = require("../dbconnection"); //reference of dbconnection.js
var transactionService = require("../service/transaction");
var memberService = require("../service/member");
var util = require("../util");

const login = (username, password, callback) => {
  return db.query(
    `SELECT count(*) as count FROM admin WHERE username = ? AND password = ?`,
    [username, password],
    callback
  );
};

const driverApprove = (admin_name, approved_at, driver_id, callback) => {
  const driver_status = 1;
  return db.query(
    `UPDATE members SET approved_by = ?,approved_at = ? ,driver_status = ? WHERE id = ?`,
    [admin_name, approved_at, driver_status, driver_id],
    callback
  );
};

module.exports = {
  login,
  driverApprove
};
