var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');

router.post('/request', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// YIN : ---DOING----
router.post('/edit', function (req, res, next) {
  driverService.updateProfileByID(req.body.ID, req.body, (err, result) => {
      if (err) {
          res.json(err);
      }
      else {
          res.json({ sucess: true });
      }
  });
});

module.exports = router;
