var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please Enter Deails gain.' });
};

var addInvestor = require('../api/addInvestor');
var ethSent = require('../api/ethSent');



router.post('/addInvestor', addInvestor.addInvestor);
router.post('/ethSent', ethSent.ethSent);


module.exports = router;
