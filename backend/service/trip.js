var db = require('../dbconnection');

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
  return db.query(`SELECT 
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
                          trip.departure_province ="`+ departure + `"OR
                          ( trip.departure_province LIKE '%` + departure + `%' AND
                          trip.destination_province LIKE '%` + destination + `%' ) OR
                          trip.destination_province ="` + destination + `")AND
                          trip.status = "opening"
                          GROUP BY trip.id
                          ORDER BY trip.start_datetime`, callback);
};
module.exports = { createTrip, searchTrip };
