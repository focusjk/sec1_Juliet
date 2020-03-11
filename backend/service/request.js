var db = require('../dbconnection');
var util = require('../util');

const createRequest = async (trip_id,member_id,data,created_at,callback) => {
    const check = await util.promisifyQuery(`SELECT count(*) as count FROM request WHERE request.trip_id = ? AND request.member_id = ?`,[trip_id,member_id]);
    const {count} = check[0];
    if ( count == 0 ){
        const {departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail} = data;
        const reqStatus = 2; //set to pending 
        return db.query(`INSERT INTO request (member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,request_status,created_at) 
        values (?,?,?,?,?,?,?,?,?,?)`,
        [member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,reqStatus,created_at],callback);
    } else {
        callback(true);
    }
    
}

function getRequestInfo(request_id,callback) {
    return db.query(`SELECT id,member_id,trip_id,departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,
    request_status,review_id,departed_at,driver_departed_at,driver_arrived_at,created_at,paid_at
    FROM request
    WHERE id = ?`
    , [request_id], callback); 
};

function getPrice(request_id,callback) {
    return db.query(`SELECT trip.price FROM request LEFT JOIN trip ON request.id = trip.id WHERE request.id = ?`
    , [request_id], callback); 
};

module.exports = {createRequest,getRequestInfo, getPrice};