var db = require("../dbconnection"); //reference of dbconnection.js

const login = (username, password, callback) => {
  return db.query(
    `SELECT count(*) as count FROM admin WHERE username = ? AND password = ?`,
    [username, password],
    callback
  );
};


module.exports = {
  login
};
