var mysql = require('mysql');
var query = require('./sql.js');
var dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'cucarpool',
  multipleStatements: true,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  connection.query(query, function(err, result) {
    if (err) throw err;
    console.log('Table created');
    connection.end();
  });
});
