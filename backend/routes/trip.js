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

router.get('/detail',(req, res, next) => {
  const {tripId} = req.query;
  console.log(tripId)
  tripService.getTripDetail({tripId},(err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Error' });
    } else{
      const trip = result;
      const owner_id = result[0].owner_id;
      tripService.getOwnerDetail({owner_id},(err,result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Error' });
        } else{
          const owner = result;
          tripService.getAllPassenger({tripId},(err,result) => {
            if (err) {
              res.json({ success: false, error: err.sqlMessage, message: 'Error' });
            }else {
              const passenger = result;
              res.json({ success: true, trip: trip , owner: owner , passenger: passenger});
            }
          })
        }
      });
    }
  })
});
  

module.exports = router;
