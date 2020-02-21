var express = require('express');
var router = express.Router();
var requestService = require('../service/request');
var util = require('../util')

router.post('/',(req, res, next) => {
    const {trip_id, member_id, ...data} = req.body;
    var created_at = util.timeformatter(new Date());
    requestService.createRequest(trip_id,member_id,data,created_at,(err,result) => {
        if (err){
            res.json({success: false, error: err.sqlMessage, message: "Trip request error"});
        } else {
            const req_id = result[0];
            requestService.getRequestInfo(req_id,(err,result)=>{
                if(err){
                    res.json({success: false, error: err.sqlMessage, message: "Get request information error"});
                } else {
                    res.json({success: true, request: result});
                }
            });
        }
    });
});
module.exports = router;