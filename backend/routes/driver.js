var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');
var util = require('../util')

router.post('/', function (req, res, next) {
    const { id, ...data } = req.body
    var edited = util.timeformatter(new Date());
    driverService.driverReq(id, { ...data, edited_at: edited }, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Invalid input" });
        }
        else {
            res.json({ success: true, driver_status: 'pending', edited_at: edited });
        }
    });
});


module.exports = router;
