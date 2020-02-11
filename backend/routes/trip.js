var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');

router.post('/', function(req, res, next) {
  const { departure, destination, selectedDate } = req.body;
  console.log(departure, destination, selectedDate);
  tripService.searchTrip(req.body,(err,result)=>{
    if(err){
      console.log(err);
      res.json({ success: false, error: err.sqlMessage, message: 'CANNOT SEARCH TRIP!!!' });
    }
    else{
      console.log(result)
      res.json({success: true, trip:result});
    }
  })
  const trip = [
    {
      id: 1,
      departure_detail: 'siam',
      departure_province: 'Bangkok',
      destination_detail: 'hospital',
      destination_province: 'Sukhothai',
      start_datetime: '1999-12-06 13:14:25',
      capacity: 4,
      request: 3,
      status: 'opening',
    },
  ];
  // res.json({ success: true, trip });
});

router.post('/create', function(req, res, next) {
  // dateTime format "YYYY-MM-DD hh:mm:ss"
  var created_at = new Date();
  var date = created_at.toISOString().split('T')[0];
  var time = created_at.getHours() + ':' + created_at.getMinutes() + ':' + created_at.getSeconds();
  // var time = now.toLocaleTimeString();
  created_at = date + ' ' + time;
  console.log('created_at :', created_at);
  tripService.createTrip(created_at, req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err.sqlMessage, message: 'CANNOT CREATE TRIP!!!' });
    } else {
      console.log('----------------create Trip----------------');
      console.log(result);
      res.json({ success: true, id: result.insertId });
    }
  });
});

module.exports = router;
