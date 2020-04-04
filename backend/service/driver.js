var db = require('../dbconnection'); //reference of dbconnection.js

const getByID = (ID, callback) => {
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

const driverReq = (ID, data, callback) => {
    return db.query(`UPDATE members SET driver_status = 'pending',approved_at = null,
                    approved_by = null,rejected_at = null,
                    rejected_by = null , ? WHERE id = ?`, [data, ID], callback);
}

const getMyTrip = (member_id, callback) => {
    return db.query(`SELECT id as trip_id,
                    departure_latitude,
                    departure_longitude,
                    departure_province,
                    departure_detail,
                    destination_latitude,
                    destination_longitude,
                    destination_province,
                    destination_detail,
                    start_datetime,
                    car_brand,
                    plate_license,
                    capacity,
                    status,
                    price FROM trip 
                    WHERE owner =?`, [member_id], callback);
}

module.exports = { getByID, driverReq, getMyTrip };

