var express = require('express');
var router = express.Router();
var requestService = require('../service/request');
var util = require('../util')

router.post('/', (req, res, next) => {
    const { trip_id, member_id, ...data } = req.body;
    var created_at = util.timeformatter(new Date());
    requestService.createRequest(trip_id, member_id, data, created_at, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot join this trip" });
        } else {
            res.json({ success: true });
        }
    });
});

router.post('/price', (req, res, next) => {
    const { request_id } = req.body;
    requestService.getPrice(request_id, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            res.json({ success: true, price: result[0]['price'] });
        }
    });
});

module.exports = router;