var express = require('express');
var router = express.Router();
var banner = require('../api/banner');
var execs = require('../api/execs')

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please Enter Deails gain.' });
};
router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});


router.get('/testApi',banner.test);
router.post('/viewIfconfig',execs.execIfconfig)
module.exports = router;
