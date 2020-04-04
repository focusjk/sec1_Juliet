var db = require("../dbconnection");
var util = require("../util");
var requestService = require('./request')

const createReview = async ({ passenger_id, driver_id, rating, comment, request_id, created_at }, callback) => {
  const review = await util.promisifyQuery(
    `INSERT INTO review (reviewer,reviewee,rating,comment,created_at) 
                                            VALUES (?,?,?,?,?)`,
    [passenger_id, driver_id, rating, comment, created_at]
  );
  await requestService.setReview(review.insertId, request_id, callback)
};

const getReviewById = (review_id, callback) => {
  return db.query(
    `SELECT comment, rating 
                    FROM review 
                    WHERE id = ?`,
    [review_id],
    callback
  );
};

const getAllReviewOfDriver = (driver_id, callback) => {
  return db.query(`SELECT members.username, review.rating, review.comment, review.created_at, members.photo
                    FROM review INNER JOIN members ON review.reviewer = members.id 
                    WHERE review.reviewee = ?`, [driver_id], callback);
}

const getTripReview = (trip_id, callback) => {
  return db.query(
    `SELECT review.comment as comment, 
    review.rating as rating, 
    review.created_at as created_at,
    members.username as username,
    members.photo as photo
    FROM review INNER JOIN request ON review.id = request.review_id
    INNER JOIN members ON request.member_id = members.id
    WHERE request.trip_id = ?`,
    [trip_id],
    callback
  );
};

module.exports = { createReview, getReviewById, getTripReview, getAllReviewOfDriver };
