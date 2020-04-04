var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');
var requestService = require('../service/request');
var tripService = require('../service/trip');
var util = require('../util')

//checked
router.post('/', function (req, res, next) {
  const { id, ...data } = req.body
  var edited = util.timeformatter(new Date());
  driverService.driverReq(id, { ...data, edited_at: edited }, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Invalid input" });
    }
    else {
      res.json({ success: true, driver_status: 'pending', edited_at: edited });
    }
  });
});

// checked
router.get('/tripRequest', function (req, res, next) {
  var ID = req.query.id;
  requestService.getPendingRequest(ID, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    }
    else {
      res.json({ success: true, request: [...result] });
    }
  });
});

//checked
router.post('/request-approve', function (req, res, next) {
  const { id } = req.body;
  requestService.requestApprove(id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.post('/request-reject', function (req, res, next) {
  const { id } = req.body;
  requestService.requestReject(id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.get('/mytrip', (req, res, next) => {
  const { member_id } = req.query;
  tripService.getTripByMemberID(member_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    } else {
      res.json({ success: true, trip: result })
    }
  })
});

module.exports = router;
