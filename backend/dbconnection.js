var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'cu-carpool',
  insecureAuth: true,
});

module.exports = connection;
