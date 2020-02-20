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
      card_code,card_expiry_date,amount FROM members WHERE username = ?`, [username],callback);
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

const editMemberInfo = (id, body, callback) => {
  const { firstname, lastname, phone_number, email, photo, card_holder_name, card_number, card_code, card_expiry_date } = body; 
    return db.query(`UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?,
      card_holder_name = ?,card_number = ?,card_code = ?,card_expiry_date = ? WHERE id = ?;`
      , [firstname, lastname, phone_number, email, photo, card_holder_name, card_number, card_code, card_expiry_date, id], callback); 
}

const payment = (ID,body, callback) => {
  const {card_number,card_holder_name,card_expiry_date,card_code} = body;
  return db.query(`UPDATE request SET request_status = 'paid' WHERE id = ? ; 
                   SELECT request.id,
                          request.request_status,
                          request.trip_id,
                          trip.price
                   FROM request LEFT JOIN trip ON request.trip_id = trip.id
                   WHERE request.id = ? ` , [ID,ID], callback);
}

module.exports = { register, getMemberInfo, login, editMemberInfo, payment };

