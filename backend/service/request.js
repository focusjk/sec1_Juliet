var db = require('../dbconnection');
var util = require('../util');
var transactionService = require('./transaction')
var tripService = require('./trip')
const createRequest = async (trip_id, member_id, data, created_at, callback) => {
    const check = await util.promisifyQuery(`SELECT count(*) as count FROM request WHERE request.trip_id = ? AND request.member_id = ? AND request.request_status not in ('canceled','rejected')`, [trip_id, member_id]);
    const { count } = check[0];
    const owner = await tripService.getOwner(trip_id)
    if (count == 0 && owner != member_id) {
        const { departure_latitude, departure_longitude, departure_detail, destination_latitude, destination_longitude, destination_detail } = data;
        const reqStatus = 2; //set to pending 
        return db.query(`INSERT INTO request (member_id,trip_id,departure_latitude,departure_longitude,departure_detail,destination_latitude,destination_longitude,destination_detail,request_status,created_at) 
        values (?,?,?,?,?,?,?,?,?,?)`,
            [member_id, trip_id, departure_latitude, departure_longitude, departure_detail, destination_latitude, destination_longitude, destination_detail, reqStatus, created_at], callback);
    } else {
        callback(true);
    }
}

function getRequestInfo(request_id, callback) {
    return db.query(`SELECT id,member_id,trip_id,departure_latitude,departure_longitude,departure_detail,destination_latitude,destination_longitude,destination_detail,
    request_status,review_id,departed_at,driver_departed_at,driver_arrived_at,created_at,paid_at
    FROM request
    WHERE id = ?`
        , [request_id], callback);
};

const payment = (ID, body, callback) => {
    const {
        card_number,
        card_holder_name,
        card_expiry_date,
        card_code,
        paid_at
    } = body;
    // call external service
    return db.query(
        `UPDATE request SET request_status = 'paid', paid_at = ? WHERE id = ? `,
        [paid_at, ID],
        callback
    );
};

const getRequestByMemberId = (member_id, callback) => {
    return db.query(
        `SELECT request.id as id,
                    request.departure_latitude,
                    request.departure_longitude,
                    request.departure_detail,
                    request.destination_latitude,
                    request.destination_longitude,
                    request.destination_detail,
                    request.departed_at,
                    request.driver_departed_at,
                    request.driver_arrived_at,
                    trip.id as trip_id,
                    trip.start_datetime,
                    trip.car_brand,
                    trip.plate_license,
                    trip.price,
                    request.request_status,
                    request.created_at,
                    request.paid_at,
                    request.review_id, 
                    members.id as owner_id,
                    members.username as owner_username,
                    members.firstName as owner_firstname,
                    members.lastName as owner_lastname
                    FROM trip INNER JOIN members ON trip.owner = members.id INNER JOIN request ON request.trip_id = trip.id
                    WHERE request.member_id = ?`,
        [member_id],
        callback
    );
};

const pickUp = async (request_id, pickup_time, callback) => {
    db.query(`UPDATE request SET driver_departed_at = ? WHERE id = ? `, [pickup_time, request_id], (err, result) => {
        if (err) {
            callback(true)
        } else {
            tripService.updateTripStatus(trip_id, status, callback)
        }
    })
}

const dropOff = async (request_id, time, trip_id, callback) => {
    const type = 2;
    const req_status = 6;
    let price;
    let owner;
    let amount;
    tripService.updateTripStatus(trip_id, 1)
    tripService.getPrice(trip_id, (err, result) => {
        if (err) callback(true)
        price = result[0].price
        owner = result[0].owner
    })
    transactionService.createTransaction(price, owner, time, type);
    memberService.getWallet(owner, (err, result) => {
        if (err) callback(true)
        amount = result[0].amount
    })
    const updated_amount = amount + ((90 / 100) * price);
    memberService.updateWallet(updated_amount, owner);
    return db.query(`UPDATE request
                     SET request_status = ? , driver_arrived_at = ?
                     WHERE id = ?`, [req_status, time, request_id], callback);
}

const getInTheCar = (request_id, depart_time, callback) => {
    const req_status = 5;
    return db.query(`UPDATE request
                     SET request_status = ? , departed_at = ?
                     WHERE id = ?`, [req_status, depart_time, request_id], callback);
}

const cancelRequest = async (request_id, cancel_time, callback) => {
    const query_result = await util.promisifyQuery(`SELECT request_status FROM request WHERE id = ?`, [request_id]);
    const { request_status } = query_result[0]

    if (request_status == 'pending' || request_status == 'approved') {
        return db.query(`UPDATE request SET request_status = 'canceled' WHERE id = ?`, [request_id], callback);
    } else if (request_status == 'paid') {
        const trip = await util.promisifyQuery(`SELECT request.trip_id FROM request WHERE id = ?`, [request_id]);
        const { trip_id } = trip[0];
        transactionService.refundTransaction(request_id, trip_id, cancel_time);
        return db.query(`UPDATE request SET request_status = 'canceled' WHERE id = ?`, [request_id], callback);
    } else {
        callback(false);
    }
}

const setReview = (review_id, request_id, callback) => {
    return db.query(
        `UPDATE request SET review_id = ? WHERE id = ?`,
        [review_id, request_id],
        callback
    );
}

const requestApprove = (ID, callback) => {
    return db.query(`UPDATE request SET request_status = 'approved' WHERE id = ?`, [ID], callback);
}

const requestReject = (ID, callback) => {
    return db.query(`UPDATE request SET request_status = 'rejected' WHERE id = ?`, [ID], callback);
}

const getRequestByTripId = (ID, callback) => {
    return db.query(`SELECT 
                            request.id AS request_id,
                            request.driver_departed_at,
                            request.driver_arrived_at,
                            request.departed_at,
                            request.request_status,
                            request.created_at AS request_at,   
                            request.paid_at,
                            request.departure_latitude,
                            request.departure_longitude ,
                            request.departure_detail,
                            request.destination_latitude,
                            request.destination_longitude ,
                            request.destination_detail,        
                            members.id AS member_id,
                            members.username,
                            members.firstname,
                            members.lastname,
                            members.photo
                            FROM request LEFT JOIN members ON request.member_id = members.id 
                            WHERE request.trip_id = ? `, [ID], callback);
};

const getPendingRequest = (ID, callback) => {
    return db.query(`SELECT 
                            request.id AS id,
                            request.departure_latitude,
                            request.departure_longitude,
                            request.destination_latitude,
                            request.destination_longitude,   
                            request.departure_detail,
                            request.destination_detail,                       
                            members.id AS member_id,
                            members.username,
                            members.phone_number,
                            members.photo
                            FROM request left join members on request.member_id = members.id 
                            WHERE request.trip_id = ? AND request.request_status = "pending"`, [ID], callback);
};

const getPassengerByTripId = (trip_id, callback) => {
    return db.query(`SELECT
                            members.id,
                            members.username,
                            members.firstname,
                            members.lastname,
                            members.phone_number,
                            members.photo,
                            request.id as request_id,
                            request.request_status,
                            request.departed_at
                            FROM members inner join request on request.member_id = members.id
                            WHERE request.request_status IN ('approved','paid','on going','done') AND request.trip_id =`+ trip_id, callback);
}

const getAllPassengerForDriver = (trip_id, callback) => {
    return db.query(`SELECT 
                            members.id, 
                            members.username, 
                            members.firstname,
                            members.lastname,
                            members.phone_number,
                            members.photo ,
                            request.id as request_id,
                            request.departure_latitude,
                            request.departure_longitude,
                            request.departure_detail,
                            request.destination_latitude,
                            request.destination_longitude,
                            request.destination_detail,
                            request.request_status,
                            request.driver_arrived_at,
                            request.departed_at,
                            request.driver_departed_at
                            FROM trip LEFT JOIN request ON trip.id = request.trip_id 
                            LEFT JOIN members ON request.member_id = members.id
                            WHERE request.request_status IN ('approved','paid','on going','done') AND trip.id = ? `, [trip_id], callback);
}


module.exports = {
    createRequest,
    getRequestInfo,
    payment,
    getRequestByMemberId,
    pickUp,
    dropOff,
    getInTheCar,
    cancelRequest,
    setReview,
    requestApprove,
    requestReject,
    getRequestByTripId,
    getPendingRequest,
    getPassengerByTripId,
    getAllPassengerForDriver
};