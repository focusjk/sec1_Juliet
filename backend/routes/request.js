var express = require('express');
var router = express.Router();
var validate = require("express-validation");
var validateRequest = require('../validate/request');
var requestService = require('../service/request');
var tripService = require('../service/trip');
var validatePayment = require("../validate/payment");
var util = require('../util')

//checked
router.post('/',validate(validateRequest), (req, res, next) => {
    const { trip_id, member_id, ...data } = req.body;
    var created_at = util.timeformatter(new Date());
    requestService.createRequest(trip_id, member_id, data, created_at, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Invalid data, please check your input again" });
        } else {
            res.json({ success: true });
        }
    });
});

// checked
router.post('/price', (req, res, next) => {
    const { request_id } = req.body;
    tripService.getPriceByRequestId(request_id, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        } else {
            res.json({ success: true, price: result[0]['price'] });
        }
    });
});

// checked
router.post("/payment", validate(validatePayment), (req, res, next) => {
    const { id, ...data } = req.body;
    var paid_at = util.timeformatter(new Date());
    requestService.payment(id, { ...data, paid_at }, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: err.sqlMessage,
                message: "Cannot access database"
            });
        } else {
            res.json({
                success: true,
                request_id: id,
                request_status: "paid",
                paid_at
            });
        }
    });
});

// checked
router.get("/trip-history", (req, res, next) => {
    const { member_id } = req.query;
    requestService.getRequestByMemberId(member_id, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: err.sqlMessage,
                message: "Cannot access database"
            });
        } else {
            res.json({ success: true, request: result });
        }
    });
});

// checked
router.post('/pick-up', (req, res, next) => {
    const status = 0;
    const { id: request_id, trip_id } = req.body;
    const pickup_time = util.timeformatter(new Date());
    requestService.pickUp(request_id, pickup_time, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
            res.json({ success: true });
        }
    })
});

//checked
router.post('/drop-off', (req, res, next) => {
    const { id: request_id, trip_id } = req.body;
    const time = util.timeformatter(new Date());
    requestService.dropOff(request_id, time, trip_id, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
            res.json({ success: true });
        }
    })
});

//checked
router.post('/get-in', (req, res, next) => {
    const { id: request_id } = req.body;
    const depart_time = util.timeformatter(new Date());
    requestService.getInTheCar(request_id, depart_time, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
            res.json({ success: true });
        }
    })
});

//checked
router.post('/cancel', (req, res, next) => {
    const { id: request_id } = req.body;
    const cancel_time = util.timeformatter(new Date());
    requestService.cancelRequest(request_id, cancel_time, (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Cannot cancel your trip' });
        } else {
            res.json({ success: true });
        }
    })
});



module.exports = router;