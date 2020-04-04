var express = require("express");
var adminService = require("../service/admin");
var memberService = require("../service/member");
var reportService = require("../service/report");
var withdrawalService = require("../service/withdrawal");
var tripService = require("../service/trip");
var requestService = require("../service/request");
var router = express.Router();
var util = require("../util");

//checked
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  adminService.login(username, password, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Cannot access database" });
    } else {
      const { count } = result[0];
      if (count == 1) res.send({ success: true, username });
      else
        res.send({
          success: false,
          message: "Username or Password is incorrect"
        });
    }
  });
});


router.get('/driver', function (req, res, next) {
  memberService.getDriverRequest((err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, driver: [...result] });
    }
  });
});

router.get("/member", function (req, res, next) {
  memberService.getAll((err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, member: result });
    }
  });
});

//checked
router.post("/driver-approve", function (req, res, next) {
  const { admin_name, id } = req.body;
  const approved_at = util.timeformatter(new Date());
  memberService.driverApprove(admin_name, approved_at, id, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.post("/driver-reject", function (req, res, next) {
  const { admin_name, id } = req.body;
  const rejected_at = util.timeformatter(new Date());
  memberService.driverReject(admin_name, rejected_at, id, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot reject user"
      });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.post('/banmember', function (req, res, next) {
  const { admin_name, id } = req.body;
  const banned_at = util.timeformatter(new Date());
  memberService.banMember(admin_name, banned_at, id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.post('/unbanmember', function (req, res, next) {
  const { id } = req.body;
  memberService.UnbanMember(id, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.get("/report", function (req, res, next) {
  reportService.getAll((err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, report: result });
    }
  });
});

//checked
router.post("/report/read", function (req, res, next) {
  const { id, is_read } = req.body;
  reportService.setRead({ id, is_read }, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.get("/withdrawal/request", (req, res, next) => {
  withdrawalService.getWithdrawalRequest((err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, request: result });
    }
  });
});

//checked
router.post("/withdrawal-approve", function (req, res, next) {
  const { admin_name, id } = req.body;
  const approved_at = util.timeformatter(new Date());
  const action = 0;
  withdrawalService.withdrawalAction(
    admin_name,
    approved_at,
    id,
    action,
    (err, result) => {
      if (err) {
        res.json({
          success: false,
          error: err.sqlMessage,
          message: "Cannot access database"
        });
      } else {
        res.json({ success: true });
      }
    }
  );
});

//checked
router.post("/withdrawal-reject", function (req, res, next) {
  const { admin_name, id } = req.body;
  const rejected_at = util.timeformatter(new Date());
  const action = 1;
  withdrawalService.withdrawalAction(
    admin_name,
    rejected_at,
    id,
    action,
    (err, result) => {
      if (err) {
        res.json({
          success: false,
          error: err.sqlMessage,
          message: "Cannot access database"
        });
      } else {
        res.json({ success: true });
      }
    }
  );
});

//checked
router.get('/trip', function (req, res, next) {
  tripService.getAll((err, result) => {
    if (err) {
      res.json({ success: false, error: err, message: 'Cannot access database' });
    } else {
      res.json({ success: true, trip: [...result] });
    }
  });
});

//checked
router.get('/trip-request', function (req, res, next) {
  var ID = req.query.id;
  requestService.getRequestByTripId(ID, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    }
    else {
      res.json({ success: true, members: [...result] });
    }
  });
});

module.exports = router;