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

const getTripDetail = (trip_id,callback) => {
  return db.query(`SELECT 
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
                          owner as owner_id FROM trip WHERE id = `+trip_id , callback);
}

const getOwnerDetail = (owner_id,callback) => {
  return db.query(`SELECT  
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
                          members.photo 
                          FROM members 
                          WHERE members.id IN (SELECT request.member_id
                                              FROM trip LEFT JOIN request ON trip.id = request.trip_id 
                                              LEFT JOIN members ON request.member_id = members.id
                                              WHERE request.request_status IN ('approved','paid','on going','done') AND trip.id =`+ trip_id+` 
                                              GROUP BY member_id)`, callback);
}

const getDriver = (trip_id,callback) => {
  return db.query(`SELECT  
                    members.id,
                    members.username,
                    members.firstname,
                    members.lastname,
                    members.phone_number,
                    members.photo
                    FROM members LEFT JOIN trip ON members.id = trip.owner
                    WHERE trip.id = `+ trip_id +
                  ` GROUP BY members.id`, callback);
}

const getAllPassengerForDriver = (trip_id,callback) => {
  return db.query(`SELECT 
                          members.id, 
                          members.username, 
                          members.firstname,
                          members.lastname,
                          members.phone_number,
                          members.photo ,
                          request.id,
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
                          FROM members LEFT JOIN request ON members.id = request.member_id
                          WHERE members.id IN (SELECT request.member_id
                                              FROM trip LEFT JOIN request ON trip.id = request.trip_id 
                                              LEFT JOIN members ON request.member_id = members.id
                                              WHERE request.request_status IN ('approved','paid','on going','done') AND trip.id =`+ trip_id+` 
                                              GROUP BY member_id)`, callback);
}


module.exports = { createTrip, searchTrip, getTripDetail, getOwnerDetail , getAllPassenger ,getDriver ,getAllPassengerForDriver};
