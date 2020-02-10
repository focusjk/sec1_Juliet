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

module.exports = { createTrip };
