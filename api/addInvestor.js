var db = require('../mongoConfig');
var axios = require('axios');

var webipc = require('../webipc');
var webrpc = require('../webrpc');
var ABI = require('../contracts/mvpABI.json');
var MVPcontract =  web3.eth.contract(ABI).at('0xC3019e6542C1B618AD4bD8b3eD409eCC9a89136b');
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
				return res.send({'result' : 'trade details saved'});
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