var db = require("../dbconnection");

const createReview = ({passenger_id, driver_id, rating, comment, created_at}, callback) => {
    return db.query(`INSERT INTO review (reviewer,reviewee,rating,comment,created_at) 
                    VALUES (?,?,?,?,?)`, [passenger_id, driver_id, rating, comment, created_at], callback);
}

module.exports = { createReview };