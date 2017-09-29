var db = require('../mongoConfig');
var axios = require('axios');

var webipc = require('../webipc');
var webrpc = require('../webrpc');
var ABI = require('../contracts/mvpABI.json');
var MVPcontract =  web3.eth.contract(ABI).at('0x77bd8858b05086f007146889d58c873aa96603dd');
var ethereum_address = require('ethereum-address');

addInvestor = (req, res, next) => {

	
		req.session.address = req.body.address,
		req.session.commodity= req.body.commodity,
		req.session.tradeTime = req.body.tradeTime,
		req.session.tradeSelection = req.body.tradeSelection
		
		if (ethereum_address.isAddress(req.session.address)) {
			investorVar = new db.investorDetail({
				"address": req.session.address,
				"commodity": req.session.commodity,
				"trade_time" : req.session.tradeTime,
				"tradeCompletionStatus" : false,
				"tradeSelection" : req.session.tradeSelection
			});
			investorVar.save()
			.then(function (response) {
				return res.send({'result' : 'success'});
			})
		  }
		  else {
			return res.send({'result' : 'invalid ethereum address'});
		  }

	
}

module.exports = 
{
	addInvestor
}