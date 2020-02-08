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
    return db.query(`SELECT * FROM driver WHERE id=?`, [ID], callback);
}

const updateProfileByID = (ID, data, callback) => {
    console.log('update driver profile by id = ', ID);
    console.log('data', data)
    return db.query(`UPDATE driver SET ? WHERE id = ?`, [data,ID], callback);
}

const updateTime = (ID,callback) =>{
    console.log('update time');
    return db.query(`UPDATE driver SET edited_at = ? WHERE id = ?`, [getCurrentDateTimeString().trimLeft().trimRight(),ID], callback);
}

const getMemberInfo = (ID,callback) => {
    console.log('get driver info')
    return db.query(`SELECT m.driver_status as driver_status, d.edited_at as edited_at 
                    FROM members as m left join driver as d ON m.id = d.id WHERE m.id = ?`
                    , [ID],callback);
  }
  
const driverRequest = (member_id,license,carbrand,plate,capacity,callback) => {
    console.log('add new req')
    return db.query("INSERT INTO request VALUES (" + member_id + ',"' + license + '","' + carbrand + '","' + plate + '","' + capacity + '")', callback);
}

module.exports = { getByID, updateProfileByID , driverRequest, updateTime, getMemberInfo};