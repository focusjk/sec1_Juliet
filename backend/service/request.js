var db = require('../dbconnection');

function createRequest(trip_id,member_id,data,created_at,callback) {
    const {departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail} = data;
    const reqStatus = 2; //set to pending 
    return db.query(`INSERT INTO request (member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,request_status,created_at) 
    values (?,?,?,?,?,?,?,?,?,?)`,
    [member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,reqStatus,created_at],callback);
}

function getRequestInfo(request_id,callback) {
    return db.query(`SELECT id,member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,
    request_status,review_id,departed_at,driver_departed_at,driver_arrived_at,created_at,paid_at
    FROM request
    WHERE id = ?`
    , [request_id], callback); 
};

module.exports = {createRequest,getRequestInfo};