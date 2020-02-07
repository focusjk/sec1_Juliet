var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  // dateTime format "YYYY-MM-DD hh:mm:ss"
  var created_at = new Date();
  var date = created_at.toISOString().split('T')[0];
  var time = created_at.getHours()+":"+created_at.getMinutes()+":"+created_at.getSeconds();
  // var time = now.toLocaleTimeString();
  created_at = date + " " + time;
  console.log("created_at :",created_at);
  tripService.createTrip(created_at,req.body,(err,result)=>{
    if(err){
      console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "CANNOT CREATE TRIP!!!"});
    }
    else{
      console.log('----------------create Trip----------------');
      console.log(result);
      res.json({ success: true, id: result.insertId });
    }
  });
});

module.exports = router;
