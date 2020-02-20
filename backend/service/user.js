var db = require('../dbconnection');

const register = (username, data, created_at, amount, callback) => {
  const { password, firstname, lastname, phone_number, email, photo } = data;
  return db.query(
    `INSERT INTO members (username,password,firstname,lastname,phone_number,email,photo,created_at,amount) VALUES (?,?,?,?,?,?,?,?,?)`
    , [username, password, firstname, lastname, phone_number, email, photo, created_at, amount], callback
  );
};

const getMemberInfo = (username, callback) => {
  return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ?`, [username], callback); //credit-card-related fields are removed from this line
}

function login(username, password, callback) {
  return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,
    amount,driving_license,approved_at,approved_by,rejected_at,rejected_by,edited_at,banned_at,banned_by FROM members WHERE username = ? AND password = ?`, [username, password], callback); //credit-card-related fields are removed from this line

}

const editMemberInfo = (id, body, callback) => {
  const { firstname, lastname, phone_number, email, photo } = body; //credit-card-related fields are removed from this line
  return db.query(`UPDATE members SET firstname = ?,lastname = ? ,phone_number = ?,email = ?,photo = ?
      WHERE id = ?;` //credit-card-related fields are removed from this line
    , [firstname, lastname, phone_number, email, photo, id], callback); //credit-card-related fields are removed from this line
}

module.exports = { register, getMemberInfo, login, editMemberInfo };