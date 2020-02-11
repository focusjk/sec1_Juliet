var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');

router.post('/', function(req, res, next) {
  const { id, ...data } = req.body
  driverService.driverReq(id, data, (err, result) => {
    if (err) {
        res.json({success: false, error: err.sqlMessage, message: "Cannot send request"});
    }
    else {
        console.log(data)
        driverService.updateTime(id, (err, result) => {
            if (err) {
                res.json({success: false, error: err.sqlMessage, message: "Cannot update time"});
            }
            else {
                console.log("time updated");
            }
            });
            driverService.getMemberInfo(id,(err, result) => {
                if (err) {
                    res.json({success: false, error: err.sqlMessage, message: "Cannnot get response"});
                }
                else {
                    console.log(JSON.stringify(result[0]));
                    res.json({ success: true, driver_status: result[0].driver_status, edited_at: result[0].edited_at});
                }
            })
    }
});
});

module.exports = router;
