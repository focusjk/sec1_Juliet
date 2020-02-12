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
    return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,card_holder_name,card_number,
      card_code,card_expiry_date,amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at FROM members WHERE username = ?`, [username],callback);
  }

  function getCurrentDateTimeString() {
    const date = new Date();
    return date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ':' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
  }
  
  function login(username,password,callback){
    console.log('login user:',username);
    return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,card_holder_name,card_number,
    card_code,card_expiry_date,amount FROM members WHERE username = ? AND password = ?`, [username,password],callback);

  }

  const editMemberInfo = (id,body,callback) => {
    const {password,firstname,lastname,phone_number,email,photo,card_holder_name,card_number,card_code,card_expiry_date} = body;
    if (password == ""){
      console.log("PASSWORD UNCHANGED")
      return db.query(`UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?,
      card_holder_name = ?,card_number = ?,card_code = ? WHERE id = ?;` 
      , [firstname,lastname,phone_number,email,photo,card_holder_name,card_number,card_code,id],callback); //card_expiry_date is still missing
    } else {
      console.log("PASSWORD CHANGED");
      return db.query(`UPDATE members SET password = ? ,firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?,
      card_holder_name = ?,card_number = ?,card_code = ?WHERE id = ?` 
      , [password,firstname,lastname,phone_number,email,photo,card_holder_name,card_number,card_code,id],callback); //card_expiry_date is still missing
    }
  }
  module.exports =  { register,getMemberInfo,getCurrentDateTimeString,login,editMemberInfo};