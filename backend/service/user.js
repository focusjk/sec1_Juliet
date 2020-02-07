var db = require('../dbconnection');
const register = (username, password,firstname,lastname,phone_number,email,photo,created_at,amount) => {
    console.log('add all data for user = ',username);
    return db.query(
      `INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`,[username,password,firstname,lastname,phone_number,email,photo,created_at,amount]
    );
  };
  
  module.exports =  { register };