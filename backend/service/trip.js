var db = require('../dbconnection');
const createTrip = (departure_latitude,departure_longtitude,departure_detail,
    destination_latitude,destination_longtitude,destination_detail,
    start_datetime,owner,car_brand,plate_license,capacity)=>{
    console.log('create Trip');
    var created_at = "1900-01-01 00:00:00";

    // return db.query("INSERT INTO " + "Review" + " (Rating,Detail,Member_ID) "+"VALUES (?,?,?)", [Rating,Detail,Member_ID], callback);
    // TODO : change
    db.query("INSERT INTO " + "trip " + `(departure_latitude,departure_longtitude,departure_detail,
                                        destination_latitude,destination_longtitude,destination_detail,
                                        start_datetime,owner,car_brand,plate_license,capacity,created_at)` + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                                        [departure_latitude,departure_longtitude,departure_detail,
                                            destination_latitude,destination_longtitude,destination_detail,
                                            start_datetime,owner,car_brand,plate_license,capacity,created_at] );
};

module.exports = { createTrip };