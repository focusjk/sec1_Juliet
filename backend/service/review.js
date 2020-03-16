var db = require("../dbconnection");

const createReview = ({passenger_id, driver_id, rating, comment, created_at}, callback) => {
    return db.query(`INSERT INTO review (reviewer,reviewee,rating,comment,created_at) 
                    VALUES (?,?,?,?,?)`, [passenger_id, driver_id, rating, comment, created_at], callback);
}

const getReviewById = (review_id, callback) => {
    return db.query(`SELECT comment, rating 
                    FROM review 
                    WHERE id = ?`, [review_id] , callback);
}

module.exports = { createReview , getReviewById };