var express = require('express');
var withdrawalService = require('../service/withdrawal');
var router = express.Router();
var util = require('../util');

router.post('/', function(req, res, next) {
    const {member_id, ...data} = req.body;
    const created_at = util.timeformatter(new Date());
    withdrawalService.createWithdrawal(member_id,created_at,data,(err,result) => {
        if(err) {
            res.json({success: false,error: err.sqlMessage,message: "Cannot access database"});
        } else {
            res.json({success: true});
        }
    });
});

module.exports = router;