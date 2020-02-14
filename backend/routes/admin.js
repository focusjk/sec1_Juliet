var express = require('express');
var adminService = require('../service/admin');
var router = express.Router();

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  adminService.login(username, password, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Cannot access database" });
    } else {
      if (result == 1) res.send({ success: true, username });
      else res.send({ success: false, message: 'Username or Password is incorrect' });
    }
  });
});

// YIN
router.get('/driver', function (req, res, next) {
  adminService.getAllMember((err, result) => {
    if (err) {
      res.json({ success: false, error: err, message: 'Cannot access database' });
    } else {
      res.json({ success: true, driver: [...result] });
    }
  });
});

router.post('/driver-approve', function (req, res, next) {
  const { admin_name, id } = req.body;
  const approved_at = adminService.getCurrentDateTimeString();
  adminService.driverApprove(admin_name, approved_at, id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      console.log(result);
      res.json({ success: true });
    }
  });
});

router.post('/driver-reject', function(req, res, next) {
  const { admin_name, id } = req.body;
  console.log(req.body);
  console.log(admin_name);
  const rejected_at = adminService.getCurrentDateTimeString();
  adminService.driverReject(admin_name, rejected_at, id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot reject user' });
    } else {
      console.log(result);
      res.json({ success: true });
    }
  });

});

module.exports = router;
