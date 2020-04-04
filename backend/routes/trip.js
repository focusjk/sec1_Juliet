var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');
var memberService = require('../service/member');
var requestService = require('../service/request');
var validate = require('express-validation');
var validateTrip = require('../validate/trip');
var util = require('../util');

//checked
router.post('/', (req, res, next) => {
  const { departure, destination, selectedDate } = req.body;
  tripService.searchTrip({ departure, destination, selectedDate }, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database ' });
    }
    else {
      res.json({ success: true, trip: result });
    }
  })
});

//checked
router.post('/create', validate(validateTrip), (req, res, next) => {
  const { start_datetime, ...data } = req.body;
  const created_at = util.timeformatter(new Date());
  const new_start_datetime = util.timeformatter(new Date(start_datetime));
  tripService.createTrip(created_at, { ...data, start_datetime: new_start_datetime }, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Invalid input' });
    } else {
      res.json({ success: true, id: result.insertId });
    }
  });
});

//checked
router.get('/detail', (req, res, next) => {
  const { tripId: trip_id } = req.query;
  tripService.getTripDetail(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      const { owner_id, ...trip } = result[0];
      memberService.getOwnerDetail(owner_id, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          const owner = result;
          requestService.getPassengerByTripId(trip_id, (err, result) => {
            if (err) {
              res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
            } else {
              const passenger = result;
              res.json({ success: true, trip, owner: owner[0], passenger });
            }
          })
        }
      });
    }
  })
});

//checked
router.post('/member', (req, res, next) => {
  const { trip_id } = req.body;
  memberService.getDriverDetail(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      const driver = result;
      requestService.getPassengerByTripId(trip_id, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          res.json({ success: true, driver: driver[0], member: result });
        }
      })
    }
  });
});

// checked
router.get('/passenger', (req, res, next) => {
  const { trip_id } = req.query;
  requestService.getAllPassengerForDriver(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true, passenger: result });
    }
  })
});

//check
router.post('/cancelTrip', (req, res, next) => {
  const { trip_id } = req.body;
  const cancel_time = util.timeformatter(new Date());
  tripService.cancelTrip({ trip_id, cancel_time }, (err, result) => {
    if (err) {
      res.json({ success: false, message: 'Cannot access database' });
    } else {
      if (result.affectedRows === 0) {
        res.json({ success: false, message: 'Your trip cannot be canceled' });
      }
      else {
        res.json({ success: true });
      }
    }
  })
})
module.exports = router;
