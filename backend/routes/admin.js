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
        res.json(err);
    }
    else {
        console.log(result)
        //res.send('respond with a resource');
        res.json({ success: true, driver:[ ...result ]});
    }
  })
});

router.post('/driver-approve', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/driver-reject', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
