var express = require('express');
var router = express.Router();
var driverService = require('../service/driver');

router.post('/request', function(req, res, next) {
  const { id, ...data } = req.body
  driverService.updateProfileByID(id, data, (err, result) => {
    if (err) {
        res.json(err);
    }
    else {
      console.log(data)
      driverService.driverReq(id, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            console.log("pending");
        }
      });

      driverService.updateTime(id, (err, result) => {
          if (err) {
              res.json(err);
          }
          else {
              console.log("time updated");
          }
        });
        driverService.getMemberInfo(id,(err, result) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ success: true, driver:result });
            }
          })
    }
});
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// YIN 
router.post('/edit', function (req, res, next) {
  const { id, ...data } = req.body
  driverService.updateProfileByID(id, data, (err, result) => {
      if (err) {
          res.json(err);
      }
      else {
        console.log(data)
        driverService.updateTime(id, (err, result) => {
            if (err) {
                res.json(err);
            }
            else {
                console.log("time updated");
            }
          });
          driverService.getMemberInfo(id,(err, result) => {
              if (err) {
                  res.json(err);
              }
              else {
                  res.json({ success: true, driver:result });
              }
            })
      }
  });
});

module.exports = router;
