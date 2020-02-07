var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  // dateTime format "YYYY-MM-DD hh:mm:ss"
  var now = new Date();
  var date = now.toISOString().split("T")[0];
  var time = now.toLocaleTimeString();
  now = date+" "+time;
  console.log("created_time :",now);
  tripService.createTrip(now,req.body,(err,result)=>{
    if(err){
      console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "CANNOT CREATE TRIP!!!"});
    }
    else{
      console.log(result);
      res.json({ success: true, id: result.insertId });
    }
  })
 
});

module.exports = router;
