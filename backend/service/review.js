var db = require("../dbconnection");
var util = require('../util');

const createReview = async ({passenger_id, driver_id, rating, comment, request_id, created_at}, callback) => {
    const review = await util.promisifyQuery(`INSERT INTO review (reviewer,reviewee,rating,comment,created_at) 
                                            VALUES (?,?,?,?,?)`, [passenger_id, driver_id, rating, comment, created_at]);
    return db.query(`UPDATE request SET review_id = ? WHERE id = ?`, [review.insertId, request_id], callback);
}

const getReviewById = (review_id, callback) => {
    return db.query(`SELECT comment, rating 
                    FROM review 
                    WHERE id = ?`, [review_id] , callback);
}

const getAllReviewOfDriver = (driver_id, callback) => {
    return db.query(`SELECT members.username, review.rating, review.comment, review.created_at, members.photo
                    FROM review INNER JOIN members ON review.reviewer = members.id 
                    WHERE review.reviewee = ?`, [driver_id], callback);
}

module.exports = { createReview , getReviewById , getAllReviewOfDriver };