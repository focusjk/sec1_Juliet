var db = require('../dbconnection'); //reference of dbconnection.js

const getByID = (ID, callback) => {
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

const driverReq = (ID, data, callback) => {
    return db.query(`UPDATE members SET driver_status = 'pending',approved_at = null,
                    approved_by = null,rejected_at = null,
                    rejected_by = null , ? WHERE id = ?`, [data, ID], callback);
}

const tripRequest = (ID, callback) => {
    return db.query(`SELECT 
                            request.id AS id,
                            request.departure_latitude,
                            request.departure_longtitude,
                            request.destination_latitude,
                            request.destination_longtitude,   
                            request.departure_detail,
                            request.destination_detail,                       
                            members.id AS member_id,
                            members.username,
                            members.phone_number,
                            members.photo
                            FROM request left join members on request.member_id = members.id 
                            WHERE request.trip_id = ? AND request.request_status = "pending"`,[ID],callback);
  };

module.exports = { getByID, driverReq, tripRequest };

