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

router.get('/tripRequest/', function (req, res, next) {
    var ID = req.query.id;
    console.log("id: " + ID);
    driverService.tripRequest(ID, (err, result) => {
        if (err) {
            res.json({ success: false, error: err.sqlMessage, message: "Something's wrong" });
        }
        else {
            res.json({ success: true, request: [...result]});
        }
    });
});

module.exports = router;