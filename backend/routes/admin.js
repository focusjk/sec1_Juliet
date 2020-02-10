var express = require('express');
var adminService = require('../service/admin');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  const data = adminService.login(username, password);
  //TODO
  res.send({ success: true, user: data });
});

// YIN
router.get('/driver', function(req, res, next) {
  adminService.getAllMember((err, result) => {
    if (err) {
      res.json({success: false, error: err, message: "Cannot access drivers information"});
    }
    else {
        console.log(result)
        res.json({ success: true, driver:[ ...result ]});
    }
  })
});

router.post('/driver-approve', function(req, res, next) {
  const { admin_name , id } = req.body;
  console.log(req.body);
  console.log(admin_name);
  const approved_at = adminService.getCurrentDateTimeString();
  adminService.driverApprove(admin_name,approved_at,id,(err,result) => {
    if(err) {
      res.json({success: false, error: err.sqlMessage , message: "Cannot approve user"});
    }else{
      res.json({success: true});
    }
  });
});

router.post('/driver-reject', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;