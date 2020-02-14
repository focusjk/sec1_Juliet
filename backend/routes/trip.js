var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');
var validate = require('express-validation');
var validateTrip = require('../validate/trip');
var util = require('../util')

router.post('/', (req, res, next) => {
  const { departure, destination, selectedDate } = req.body;
  tripService.searchTrip({ departure, destination, selectedDate }, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    }
    else {
      res.json({ success: true, trip: result });
    }
  })
});

router.post('/create', validate(validateTrip), (req, res, next) => {
  const { start_datetime, ...data } = req.body;
  var created_at = util.timeformatter(new Date());
  var new_start_datetime = util.timeformatter(new Date(start_datetime));
  tripService.createTrip(created_at, { ...data, start_datetime: new_start_datetime }, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Invalid input' });
    } else {
      res.json({ success: true, id: result.insertId });
    }
  });
});

module.exports = router;
