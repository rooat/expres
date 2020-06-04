var express = require('express');
var router = express.Router();
var Banner = require('../api/banner');
var User = require('../api/user');
var banner = new Banner();
var user = new User();

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


router.get('/testApi',banner.testApi);
router.post('/login',user.login);
router.get('/logout',user.logout)
module.exports = router;
