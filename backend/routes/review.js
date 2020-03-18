var express = require('express');
var router = express.Router();
var reviewService = require('../service/review');
var validate = require('express-validation');
var util = require('../util')

router.post('/create', (req, res, next) => {
    const {passenger_id, driver_id, rating, comment, request_id} = req.body;
    var created_at = util.timeformatter(new Date());
    reviewService.createReview({passenger_id, driver_id, rating, comment, request_id, created_at}, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            console.log(result);
            res.json({ success: true });
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

router.get('/getAllReviewOfDriver', (req, res, next) => {
    const {driver_id} = req.query;
    reviewService.getAllReviewOfDriver(driver_id, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            res.json({ success: true, review: result});
        }    
    })
})

module.exports = router;