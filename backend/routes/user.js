var express = require('express');
var userService = require('../service/user');
var router = express.Router();

router.post('/', function(req, res, next) {
  const {id, ...data} = req.body;
  userService.editMemberInfo(id,data,(err,result)=> {
    if (err) {
      console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "editing error"});
    } else {
      console.log(result);
      res.json({success: true});
    }
  });
});

router.post('/register', function(req, res, next) { 
  var amount = 0;
  var created_at = userService.getCurrentDateTimeString()
  console.log('created_time :', created_at);
  const { username, ...data } = req.body
  userService.register(username,data,created_at,amount,(err,result)=> {
    if (err) {
      console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "Registration error"});
    }
    else {
      console.log(result)
      userService.getMemberInfo(username,(err,result)=>{
        if (err){
          console.log(err);
          res.json({success: false, error: err.sqlMessage, message: "Get information error"});
        }else{
          console.log(result);
          res.json({success: true, information: result});
        }
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  const {username,password} = req.body;
  userService.login(username,password,(err,result)=>{
    if (err) {
      console.log(err);
      res.json({success: false, error: err.sqlMessage, message: "Invalid username/password"});
    } else {
      console.log(result);
      if (result == ""){
        res.json({success:false, message: "Invalid username/password"})
      }else{
        res.json({success:true, information: result});
      }
    }
  });
});

module.exports = router;
