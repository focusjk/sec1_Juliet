var db = require('../dbconnection'); //reference of dbconnection.js

function getCurrentDateTimeString() {
    const date = new Date();
    return date.getFullYear() + '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getDate().toString().padStart(2, '0') + ':' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0');
  }
  
const getByID = (ID, callback) => {
    console.log('get driver profile with id = ', ID)
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

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
    console.log('update driver_status to pending: id = ', ID);
    return db.query(`UPDATE members SET driver_status = 'pending', ? WHERE id = ?`, [data,ID], callback);
}

module.exports = { getByID, updateProfileByID , updateTime, getMemberInfo, driverReq};