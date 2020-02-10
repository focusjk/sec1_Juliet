var express = require('express');
var userService = require('../service/user');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  var created_at = new Date();
  var date = created_at.toISOString().split('T')[0];
  var time_hour = created_at.getHours()
  var time_min = created_at.getMinutes()
  var time_sec = created_at.getSeconds()
  var amount = 0;
  created_at = date + ' ' + time_hour+':' + time_min+':'+time_sec;
  console.log('created_time :', created_at);
  const { username, ...data } = req.body
  userService.register(username,data,created_at,amount,(err,result)=> {
    if (err) {
      //console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "Registration error"});
    }
    else {
      console.log(result)
      userService.getMemberInfo(username,(err,result)=>{
        if (err){
          console.log(err);
          res.json({success: false, error: err.sqlMessage, message: "Get information error"});
        }
        else{
          console.log(result);
          res.json({success: true, information: result});
        }
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
