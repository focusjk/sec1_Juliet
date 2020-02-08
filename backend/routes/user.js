var express = require('express');
var userService = require('../service/user');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  const {username,password,firstname,lastname,phone_number,email,photo} = req.body;
  const data = userService.register(username, password,firstname,lastname,phone_number,email,photo);
  res.send({success: true,user:data});
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
