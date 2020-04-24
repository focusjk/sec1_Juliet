var express = require('express');
var router = express.Router();
var mock = require('../dbmockdata');
/* GET home page. */
router.get('/mock', async (req, res, next) => {
	await mock();
	res.send('success');
});

module.exports = router;
