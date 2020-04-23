var mysql = require('mysql');
var query = require('./sql.js');
var dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	insecureAuth: true,
	multipleStatements: true,
});

connection.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
	connection.query(query, function (err, result) {
		if (err) throw err;
		console.log('Table created');
		connection.end();
	});
});
