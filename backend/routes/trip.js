var express = require('express');
var router = express.Router();
var tripService = require('../service/trip');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
  const {departure_latitude,departure_longtitude,departure_detail,
        destination_latitude,destination_longtitude,destination_detail,
        start_datetime,owner,car_brand,plate_license,capacity} = req.body;
  const id = tripService.createTrip(departure_latitude,departure_longtitude,departure_detail,
    destination_latitude,destination_longtitude,destination_detail,
    start_datetime,owner,car_brand,plate_license,capacity);
  res.send({ success: true, id: id });
});

module.exports = router;
