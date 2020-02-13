var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');

router.post('/', function (req, res, next) {
  const { departure, destination, selectedDate } = req.body;
  tripService.searchTrip(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    }
    else {
      console.log(result)
      res.json({ success: true, trip: result });
    }
  })
});

router.post('/create', function (req, res, next) {
  var created_at = new Date();
  var date = created_at.toISOString().split('T')[0];
  var time = created_at.getHours() + ':' + created_at.getMinutes() + ':' + created_at.getSeconds();
  created_at = date + ' ' + time;
  tripService.createTrip(created_at, req.body, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true, id: result.insertId });
    }
  });
});

module.exports = router;
