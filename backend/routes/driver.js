var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');
var util = require('../util')

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

router.get('/tripRequest/', function (req, res, next) {
  var ID = req.query.id;
  driverService.tripRequest(ID, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    }
    else {
      res.json({ success: true, request: [...result] });
    }
  });
});

router.post('/request-approve', function (req, res, next) {
  const { id } = req.body;
  driverService.requestApprove(id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

router.post('/request-reject', function (req, res, next) {
  const { id } = req.body;
  driverService.requestReject(id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

router.get('/mytrip', (req, res, next) => {
  const { member_id } = req.query;
  driverService.getMyTrip(member_id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    } else {
      res.json({ success: true, trip: result })
    }
  })
});

module.exports = router;
