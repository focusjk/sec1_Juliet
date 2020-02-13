var db = require('../dbconnection'); //reference of dbconnection.js
  
const getByID = (ID, callback) => {
    console.log('get driver profile with id = ', ID)
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

const driverReq = (ID, data, callback) => {
    console.log('update driver_status to pending: id = ', ID);
    return db.query(`UPDATE members SET driver_status = 'pending' , ? WHERE id = ?`, [data,ID], callback);
}

module.exports = { getByID , driverReq};