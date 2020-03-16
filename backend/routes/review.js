var express = require('express');
var router = express.Router();
var reviewService = require('../service/review');
var validate = require('express-validation');
var util = require('../util')

router.post('/create', (req, res, next) => {
    const {passenger_id, driver_id, rating, comment} = req.body;
    var created_at = util.timeformatter(new Date());
    reviewService.createReview({passenger_id, driver_id, rating, comment, created_at}, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            res.json({ success: true, review_id: result.insertId });
        }
    })
});

router.get('/getReviewById', (req, res, next) => {
    const {review_id} = req.query;
    reviewService.getReviewById(review_id, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            res.json({ success: true, review : result[0] });
        } 
    })
})

module.exports = router;