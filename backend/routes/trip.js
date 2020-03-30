var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');
var validate = require('express-validation');
var validateTrip = require('../validate/trip');
var util = require('../util');

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

router.get('/detail', (req, res, next) => {
  const { tripId: trip_id } = req.query;
  tripService.getTripDetail(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      const { owner_id, ...trip } = result[0];
      tripService.getOwnerDetail(owner_id, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          const owner = result;
          tripService.getAllPassenger(trip_id, (err, result) => {
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

router.post('/member', (req, res, next) => {
  const { trip_id } = req.body;
  tripService.getDriver(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      const driver = result;
      tripService.getAllPassenger(trip_id, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          res.json({ success: true, driver: driver[0], member: result });
        }
      })
    }
  });
});

router.get('/passenger', (req, res, next) => {
  const { trip_id } = req.query;
  tripService.getAllPassengerForDriver(trip_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true, passenger: result });
    }
  })
});

router.post('/pickupMember', (req, res, next) => {
  const status = 0;
  const { id: request_id, trip_id } = req.body;
  const pickup_time = util.timeformatter(new Date());
  tripService.pickUpMember(request_id, pickup_time, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      tripService.updateTripStatus(trip_id, status, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          res.json({ success: true });
        }
      })
    }
  })
});

router.post('/dropOffMember', (req, res, next) => {
  const status = 1;
  const { id: request_id, trip_id } = req.body;
  const pickup_time = util.timeformatter(new Date());
  tripService.dropOff(request_id, pickup_time, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      tripService.updateTripStatus(trip_id, status, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
        } else {
          res.json({ success: true });
        }
      })
    }
  })
});

router.post('/getInTheCar', (req, res, next) => {
  const { id: request_id } = req.body;
  const depart_time = util.timeformatter(new Date());
  tripService.getInTheCar(request_id, depart_time, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  })
});

router.post('/cancelRequest', (req, res, next) => {
  const { id: request_id } = req.body;
  const cancel_time = util.timeformatter(new Date());
  tripService.cancelRequest(request_id, cancel_time, (err, result) => {
    if (err) {
      res.json({ success: false, message: 'Cannot cancel your trip' });
    } else {
      res.json({ success: true });
    }
  })
});

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
