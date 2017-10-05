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
var ethSentBitcoin = require('../api/ethSentBitcoin');
var ethSentEther = require('../api/ethSentEther');
var ethSentLitecoin = require('../api/ethSentLitecoin');

router.post('/addInvestor', addInvestor.addInvestor);
router.post('/ethSentBitcoin', ethSentBitcoin.ethSentBitcoin);
router.post('/ethSentEther', ethSentEther.ethSentEther);
router.post('/ethSentLitecoin', ethSentLitecoin.ethSentLitecoin);
module.exports = router;
