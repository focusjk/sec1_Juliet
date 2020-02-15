var db = require('../dbconnection');
const register = (username, data, created_at, amount, callback) => {
  const { password, firstname, lastname, phone_number, email, photo } = data;
  return db.query(
    `INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`
    , [username, password, firstname, lastname, phone_number, email, photo, created_at, amount], callback
  );
};

const getMemberInfo = (username, callback) => {
  return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,card_holder_name,card_number,
      card_code,card_expiry_date,amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at FROM members WHERE username = ?`, [username], callback);
}

function login(username, password, callback) {
  return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,card_holder_name,card_number,
    card_code,card_expiry_date,amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at FROM members WHERE username = ? AND password = ?`, [username, password], callback);

}

const editMemberInfo = (id, body, callback) => {
  const { password, firstname, lastname, phone_number, email, photo, card_holder_name, card_number, card_code, card_expiry_date } = body;
  if (password == "") {
    return db.query(`UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?,
      card_holder_name = ?,card_number = ?,card_code = ?,card_expiry_date = ? WHERE id = ?;`
      , [firstname, lastname, phone_number, email, photo, card_holder_name, card_number, card_code, card_expiry_date, id], callback); //card_expiry_date is still missing
  } else {
    return db.query(`UPDATE members SET password = ? ,firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?,
      card_holder_name = ?,card_number = ?,card_code = ?,card_expiry_date = ? WHERE id = ?`
      , [password, firstname, lastname, phone_number, email, photo, card_holder_name, card_number, card_code, card_expiry_date, id], callback); //card_expiry_date is still missing
  }
}
module.exports = { register, getMemberInfo, login, editMemberInfo };