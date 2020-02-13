var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');

router.post('/', function (req, res, next) {
    const { id, ...data } = req.body
    driverService.driverReq(id, data, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
        }
        else {
            driverService.updateTime(id, (err, result) => {
                if (err) {
                    res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
                }
            });
            driverService.getMemberInfo(id, (err, result) => {
                if (err) {
                    res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
                }
                else {
                    res.json({ success: true, driver_status: result[0].driver_status, edited_at: result[0].edited_at });
                }
            })
        }
    });
});

module.exports = router;
