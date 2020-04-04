var express = require("express");
var memberService = require("../service/member");
var validate = require("express-validation");
var validateUser = require("../validate/user");
var router = express.Router();
var util = require("../util");

//checked
router.post("/", validate(validateUser), (req, res, next) => {
  const { id, ...data } = req.body;
  memberService.editMemberInfo(id, data, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Invalid input"
      });
    } else {
      res.json({ success: true });
    }
  });
});

//checked
router.post("/register", validate(validateUser), (req, res, next) => {
  const amount = 0;
  const created_at = util.timeformatter(new Date());
  const { username, ...data } = req.body;
  memberService.register(username, data, created_at, amount, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Invalid input"
      });
    } else {
      memberService.getMemberInfo(username, (err, result) => {
        if (err) {
          res.json({
            success: false,
            error: err.sqlMessage,
            message: "Get information error"
          });
        } else {
          res.json({ success: true, information: result });
        }
      });
    }
  });
});

//checked
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  memberService.login(username, password, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      if (result == "") {
        res.json({ success: false, message: "Invalid username/password" });
      } else {
        res.json({ success: true, information: result });
      }
    }
  });
});

//checked
router.get("/wallet", (req, res, next) => {
  const { id: member_id } = req.query;
  memberService.getWallet(member_id, (err, result) => {
    if (err) {
      res.json({
        success: false,
        error: err.sqlMessage,
        message: "Cannot access database"
      });
    } else {
      res.json({ success: true, amount: result[0].amount });
    }
  });
});

module.exports = router;
