var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'cu-carpool',
  insecureAuth: true,
});

module.exports = connection;
