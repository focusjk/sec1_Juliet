var db = require('../dbconnection'); //reference of dbconnection.js
  
const getByID = (ID, callback) => {
    console.log('get driver profile with id = ', ID)
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

<<<<<<< HEAD
const driverReq = (ID, data, callback) => {
=======
const updateProfileByID = (ID, data, callback) => {
    console.log('update driver profile by id = ', ID);
    console.log('data', data)
    return db.query(`UPDATE members SET ? WHERE id = ?`, [data,ID], callback);
}

const updateTime = (ID,callback) =>{
    console.log('update time');
    return db.query(`UPDATE members SET edited_at = ? WHERE id = ?`, [getCurrentDateTimeString().trimLeft().trimRight(),ID], callback);
}

const getMemberInfo = (ID,callback) => {
    console.log('get driver info')
    return db.query(`SELECT driver_status, edited_at FROM members WHERE id = ?`, [ID],callback);
  }

const driverReq = (edited_at,{ID, data}, callback) => {
>>>>>>> yin
    console.log('update driver_status to pending: id = ', ID);
    return db.query(`UPDATE members SET driver_status = 'pending' , ? WHERE id = ?`, [data,ID], callback);
}

module.exports = { getByID , driverReq};