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
var tradeDetails = require('../api/tradeDetails');
var myTradeDetails = require('../api/myTradeDetails');

router.post('/addInvestor', addInvestor.addInvestor);
router.post('/ethSentBitcoin', ethSentBitcoin.ethSentBitcoin);
router.post('/ethSentEther', ethSentEther.ethSentEther);
router.post('/ethSentLitecoin', ethSentLitecoin.ethSentLitecoin);
router.post('/tradeDetails', tradeDetails.tradeDetails);
router.post('/myTradeDetails', myTradeDetails.myTradeDetails);
module.exports = router;
