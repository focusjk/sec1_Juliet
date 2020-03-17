var express = require("express");
var adminService = require("../service/admin");
var router = express.Router();
var util = require("../util");

router.post("/login", function(req, res, next) {
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

// YIN
router.get("/driver", function(req, res, next) {
  adminService.getAllMember((err, result) => {
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

router.post("/driver-approve", function(req, res, next) {
  const { admin_name, id } = req.body;
  const approved_at = util.timeformatter(new Date());
  adminService.driverApprove(admin_name, approved_at, id, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      console.log(result);
      res.json({ success: true });
    }
  });
});

router.post("/driver-reject", function(req, res, next) {
  const { admin_name, id } = req.body;
  console.log(req.body);
  console.log(admin_name);
  const rejected_at = util.timeformatter(new Date());
  adminService.driverReject(admin_name, rejected_at, id, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot reject user"
      });
    } else {
      console.log(result);
      res.json({ success: true });
    }
  });
});

router.get("/report", function(req, res, next) {
  adminService.getAllReport((err, result) => {
    if (err) {
      console.log(err);
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

router.post("/report/read", function(req, res, next) {
  const { id, is_read } = req.body;
  adminService.isRead({ id, is_read }, (err, result) => {
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

router.get("/withdrawal/request", (req, res, next) => {
  adminService.geteWithdrawalRequest((err, result) => {
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

router.post("/withdrawal-approve", function(req, res, next) {
  const { admin_name, id, member_id, amount } = req.body;
  const approved_at = util.timeformatter(new Date());
  const action = 0;
  adminService.withdrawalApprove(
    admin_name,
    approved_at,
    id,
    member_id,
    amount,
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

router.post("/withdrawal-reject", function(req, res, next) {
  const { admin_name, id } = req.body;
  const rejected_at = util.timeformatter(new Date());
  const action = 1;
  adminService.withdrawalApprove(
    admin_name,
    rejected_at,
    id,
    member_id,
    amount,
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

module.exports = router;
