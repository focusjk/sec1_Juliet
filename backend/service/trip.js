var db = require("../dbconnection");

const createTrip = (
  created_at,
  {
    departure_latitude,
    departure_longtitude,
    departure_detail,
    destination_latitude,
    destination_longtitude,
    destination_detail,
    start_datetime,
    owner,
    car_brand,
    plate_license,
    capacity,
    departure_province,
    destination_province,
    price
  },
  callback
) => {
  return db.query(
    `INSERT INTO trip ` +
    `(departure_latitude,departure_longtitude,departure_detail,
                                        destination_latitude,destination_longtitude,destination_detail,
                                        start_datetime,owner,car_brand,plate_license,capacity,created_at,
                                        departure_province,destination_province,price)` +
    `VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      departure_latitude,
      departure_longtitude,
      departure_detail,
      destination_latitude,
      destination_longtitude,
      destination_detail,
      start_datetime,
      owner,
      car_brand,
      plate_license,
      capacity,
      created_at,
      departure_province,
      destination_province,
      price
    ],
    callback
  );
};

const searchTrip = ({ departure, destination, selectedDate }, callback) => {
  return db.query(
    `SELECT
        trip.id,
        trip.departure_detail,
        trip.departure_province,
        trip.destination_detail,
        trip.destination_province,
        trip.start_datetime,
        capacity,
        Count(Distinct request.id) AS request,
        status,
        trip.price
        FROM trip left join request on trip.id = request.trip_id AND request_status = "approved"
        WHERE trip.start_datetime LIKE '%` + selectedDate + `%' AND (
        trip.departure_province ="` + departure + `"OR
        ( trip.departure_province LIKE '%` + departure + `%' AND
        trip.destination_province LIKE '%` + destination + `%' ) OR
        trip.destination_province ="` + destination + `")AND
        trip.status = "scheduled"
        GROUP BY trip.id
        ORDER BY trip.start_datetime`, callback
  );
};

const getTripDetail = (trip_id, callback) => {
<<<<<<< HEAD
  return db.query(`SELECT 
=======
  return db.query(`SELECT
>>>>>>> 5212afc1dc03fa70cb568fc76e0f50c60d9761fc
                          id,
                          departure_latitude,
                          departure_longtitude,
                          departure_province,
                          departure_detail,
                          destination_latitude,
                          destination_longtitude,
                          destination_province,
                          destination_detail,
                          start_datetime,
                          car_brand,
                          plate_license,
                          capacity,
                          status,
                          price,
                          owner as owner_id FROM trip WHERE id = `+ trip_id, callback);
}

const getOwnerDetail = (owner_id, callback) => {
<<<<<<< HEAD
  return db.query(`SELECT  
=======
  return db.query(`SELECT
>>>>>>> 5212afc1dc03fa70cb568fc76e0f50c60d9761fc
                          members.id as id,
                          members.username as username,
                          members.firstname as firstname,
                          members.lastName as lastname,
                          members.phone_number as phone_number,
                          members.email as email,
                          members.photo as photo,
                          AVG(review.rating ) as avg_rating
                          FROM members  left join review on review.reviewee=members.id
                          WHERE members.id = `+ owner_id +
    ` GROUP BY members.id`, callback);
}

const getAllPassenger = (trip_id, callback) => {
  return db.query(`SELECT
                          members.id,
                          members.username,
                          members.firstname,
                          members.lastname,
                          members.phone_number,
                          members.photo
                          FROM members
                          WHERE members.id IN (SELECT request.member_id
                                              FROM trip LEFT JOIN request ON trip.id = request.trip_id
                                              LEFT JOIN members ON request.member_id = members.id
                                              WHERE request.request_status IN ('approved','paid','on going','done') AND trip.id =`+ trip_id + ` 
                                              GROUP BY member_id)`, callback);
}

const getDriver = (trip_id, callback) => {
  return db.query(`SELECT  
                    members.id,
                    members.username,
                    members.firstname,
                    members.lastname,
                    members.phone_number,
                    members.photo
                    FROM members LEFT JOIN trip ON members.id = trip.owner
                    WHERE trip.id = ? `, [trip_id], callback);
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
                          request.departure_longtitude,
                          request.departure_detail,
                          request.destination_latitude,
                          request.destination_longtitude,
                          request.destination_detail,
                          request.request_status,
                          request.driver_arrived_at,
                          request.departed_at,
                          request.driver_departed_at
                          FROM trip LEFT JOIN request ON trip.id = request.trip_id 
                          LEFT JOIN members ON request.member_id = members.id
                          WHERE request.request_status IN ('approved','paid','on going','done') AND trip.id = ? `, [trip_id], callback);
}


<<<<<<< HEAD
module.exports = { createTrip, searchTrip, getTripDetail, getOwnerDetail, getAllPassenger, getDriver, getAllPassengerForDriver };
=======
const pickUpMember = (request_id, pickup_time, callback) => {
  return db.query(`UPDATE request
                   SET driver_departed_at = ?
                   WHERE id = ? `, [pickup_time, request_id], callback);
}

const getInTheCar = (request_id, depart_time, callback) => {
  const req_status = 5;
  return db.query(`UPDATE request
                   SET request_status = ? , departed_at = ?
                   WHERE id = ?`, [req_status, depart_time, request_id], callback);
}

const dropOff = (request_id, depart_time, callback) => {
  const req_status = 6;
  return db.query(`UPDATE request
                   SET request_status = ? , driver_arrived_at = ?
                   WHERE id = ?`, [req_status, depart_time, request_id], callback);
}

const promisifyQuery = (query, args) => new Promise((resolve, reject) => db.query(query, args,
  (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }))

const updateTripStatus = async (trip_id, status, callback) => {

  // status : 0 - pick up , 1 - drop off , 2 - cancel
  const que = await promisifyQuery(`SELECT trip.status FROM trip WHERE id = ? `, [trip_id]);
  const recent_status = que[0].status;
  const passenger_left = await promisifyQuery(`SELECT count(*) as amount FROM  request WHERE trip_id = ? and request_status in ('on going','paid')`, [trip_id]);
  const { amount: amount_passenger_left } = passenger_left[0]

  var trip_status;
  if (recent_status == 'scheduled' && status == 0) { //pick up
    trip_status = 2;
  } else if (recent_status == 'on going' && status == 1 && amount_passenger_left == 0) { //drop-off
    trip_status = 4;
  } else {
    trip_status = recent_status;
  }
  return await db.query(`UPDATE trip SET status = ? WHERE id = ?`, [trip_status, trip_id], callback);
}

const cancelTrip = async (request_id, callback) => {
  const query_result = await promisifyQuery(`SELECT request_status FROM request WHERE id = ?`, [request_id]);
  const { request_status } = query_result[0]

  if (request_status == 'pending' || request_status == 'approved') {
    return db.query(`UPDATE request SET request_status = 'canceled' WHERE id = ?`, [request_id], callback);
  } else if (request_status == 'paid') {
    // transactionService.create( something ) TODO
    // TODO เขียน service ของ transaction แยก ตามที่บอกไว้ตอนประชุม
    // เขียน service (1) ที่ใช้ในการสร้าง transaction
    // เขียน service (2) สำหรับการคืนเงิน ให้กับ passenger โดยเรียกใช้ (1)
    // ใ่สอันนี้ใน (2) var amount = await promisifyQuery(`SELECT trip.price FROM trip WHERE trip_id = ?`, [trip_id]);
    // ใ่สอันนี้ใน (2) var result = await promisifyQuery(`INSERT INTO transaction (amount,member_id,created_at,type) VALUES (?,?,?,?)`, [amount, member_id, time, transact_type])
    return db.query(`UPDATE request SET request_status = 'canceled' WHERE id = ?`, [request_id], callback);
  } else {
    callback(true)
    return
  }
}

module.exports = { createTrip, searchTrip, getTripDetail, getOwnerDetail, getAllPassenger, getDriver, getAllPassengerForDriver, pickUpMember, getInTheCar, updateTripStatus, dropOff, cancelTrip };
>>>>>>> 5212afc1dc03fa70cb568fc76e0f50c60d9761fc
