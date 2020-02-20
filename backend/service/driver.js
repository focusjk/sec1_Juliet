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

const tripRequest = (ID, callback) => {
    return db.query(`SELECT 
                            request.id AS id,
                            request.departure_latitude,
                            request.departure_longtitude,
                            request.destination_latitude,
                            request.destination_longtitude,                          
                            members.id AS member_id,
                            members.username,
                            members.phone_number,
                            members.photo
                            FROM request left join members on request.member_id = members.id 
                            WHERE request.trip_id = ? AND request.request_status = "pending"`,[ID],callback);
  };

module.exports = { getByID, driverReq, tripRequest };

