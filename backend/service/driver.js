var db = require('../dbconnection'); //reference of dbconnection.js

const getByID = (ID, callback) => {
    return db.query(`SELECT * FROM members WHERE id=? AND driver_status = 'approved' `, [ID], callback);
}

const driverReq = (ID, data, callback) => {
    return db.query(`UPDATE members SET driver_status = 'pending',approved_at = null,
                    approved_by = null,rejected_at = null,
                    rejected_by = null , ? WHERE id = ?`, [data, ID], callback);
}

module.exports = { getByID, driverReq };