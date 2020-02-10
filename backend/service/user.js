var db = require('../dbconnection');
const register = (username,data,created_at,amount,callback) => {
    console.log('add all data for user = ',username);
    const { password,firstname,lastname,phone_number,email,photo} = data;
    return db.query(
      `INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`
      ,[username,password,firstname,lastname,phone_number,email,photo,created_at,amount],callback
    );
  };

  const getMemberInfo = (username,callback) => {
    console.log('get member info')
    return db.query(`SELECT username,firstname,lastname,phone_number,email,photo,driver_status,card_holder_name,card_number,
      card_code,card_expiry_date,amount FROM members WHERE username = ?`, [username],callback);
  }
  
  module.exports =  { register,getMemberInfo};