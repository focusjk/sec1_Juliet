var db = require('../dbconnection'); //reference of dbconnection.js

const login = (username, password) => {
  console.log('get all product with keyword = ', keyword);
  return db.query(
    `SELECT * FROM Admin WHERE username = ` + keyword + ` AND password = ` + keyword + ``
  );
};

// YIN
const getAllMember = (callback) => {
  console.log('get all member')
  return db.query(`SELECT id,username,firstname,lastname,phone_number,email,photo,driver_status,driving_license,
                  approved_at, approved_by,rejected_at,rejected_by,edited_at, driver_status
                  FROM members WHERE driver_status = 'approved'` , callback);
}


module.exports = { login, getAllMember};
