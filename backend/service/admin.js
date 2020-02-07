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
  return db.query(`SELECT 
            m.id as id,
            m.username as username,
            m.firstname as firstname,
            m.lastname as lastname,
            m.phone_number as phone_number,
            m.email as email,
            m.photo as photo,
            m.driver_status as driver_status,
            d.driving_license as driving_license,
            d.approved_at as approved_at,
            d.approved_by as approved_by,
            d.rejected_at as rejected_at,
            d.rejected_by as rejected_by,
            d.edited_at as edited_at,
            d.driver_status as driver_status,
            d.car_brand as car_brand,
            d.plate_license as plate_license,
            d.capacity as capacity
        FROM members as m left join driver as d ON m.id = d.id`
        , callback);
}


module.exports = { login, getAllMember};
