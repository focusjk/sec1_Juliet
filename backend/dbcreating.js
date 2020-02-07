var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  connection.query('CREATE DATABASE cucarpool', function(err, result) {
    if (err) throw err;
    console.log('Database created');
    connection.end();
  });
});

module.exports = connection;
