var express = require('express');
var userService = require('../service/user');
var validate = require('express-validation');
var validateUser = require('../validate/user');
var validatePayment = require('../validate/payment');
var router = express.Router();
var util = require('../util');

router.post('/', validate(validateUser),(req, res, next) => {
  const { id, ...data } = req.body;
  userService.editMemberInfo(id, data, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Invalid input" });
    } else {
      res.json({ success: true });
    }
  });
});

router.post('/register',validate(validateUser), (req, res, next) => {
  var amount = 0;
  var created_at = util.timeformatter(new Date());
  console.log(created_at);
  const { username, ...data } = req.body
  userService.register(username, data, created_at, amount, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err.sqlMessage, message: "Invalid input" });
    }
    else {
      userService.getMemberInfo(username, (err, result) => {
        if (err) {
          res.json({ success: false, error: err.sqlMessage, message: "Get information error" });
        } else {
          res.json({ success: true, information: result });
        }
      });
    }
  });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  userService.login(username, password, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    } else {
      if (result == "") {
        res.json({ success: false, message: "Invalid username/password" })
      } else {
        res.json({ success: true, information: result });
      }
    }
  });
});

router.post('/payment', validate(validatePayment), (req, res, next) => {
  const { id, ...data } = req.body;
  var paymenttime = util.timeformatter(new Date());
  userService.payment(id, {... data, paid_at: paymenttime}, (err, result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: "Cannot access database" });
    } else {
      res.json({ success: true, request_id: id, request_status: 'paid', paid_at:paymenttime });
    }
  });
});

router.get('/trip-history', (req, res, next) => {
  const {userId : member_id} = req.query;
  userService.getTripHistory( member_id , (err,result) => {
    if (err) {
      res.json({ success: false, error: err.sqlMessage, message: 'Cannot access database' });
    } else {
      res.json({ success: true, request: result});
    }
  }) 
})

module.exports = router;
