var db = require('../mongoConfig');
var axios = require('axios');
var webipc = require('../webipc');
var webrpc = require('../webrpc');

var ABI = require('../contracts/mvpABI.json');
var MVPcontract =  web3.eth.contract(ABI).at('0x77bd8858b05086f007146889d58c873aa96603dd');
controllerAddress = '0xc7128c185ef4043e0150a8fa8950b62e672468dc';
controllerKey = 'secretPhrase';

ethSent = (req, res, next) => {


	var investorVar = "";

	var Price1,Price2;
	var Timestamp1,Timestamp2;

var apiLink = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";
axios.get(apiLink)
.then((response) => {

	if (response.status == 200) {
			console.log("price 1",response.data.USD);
			Price1 = response.data.USD;
			Timestamp1 = Math.floor(Date.now()/1000);
			console.log()
			Timestamp2 = Timestamp1 + (req.session.tradeTime * 60);
			setTimeout(function () {
				console.log('tradeTime completed'); 

				axios.get(apiLink)
				.then((response) => {

					Price2 = response.data.USD;
					db.investorDetail.findOneAndUpdate({ address : req.session.address, tradeCompletionStatus : false },
						{$set:{price1:Price1, price2:Price2, timestamp1:Timestamp1, timestamp2:Timestamp2, tradeCompletionStatus :true}}, 
						{new: true})
					.then((response) => {

						console.log(response);

							web3.personal.unlockAccount(controllerAddress,controllerKey, (err, unlocked) => {
								if (!unlocked) {
									return res.status(500),send();
								}
								else {

									var locprice1 = response.price1 *100;
									var locprice2 = response.price2 * 100;
									MVPcontract.result(response.address,locprice1,locprice2,response.tradeSelection,{ from: controllerAddress, gas: 200000 },(err, txid) => {
											if(txid)
											{
												console.log("smart contract result() invoked");
											}
								})
						}})

						return res.send({'result' : 'success'});
					})
					
			}).catch(function (e) {
					res.send({ 'status': 'failure', Error: e });
				});
				
			}, (req.session.tradeTime * 60 * 1000));

	}
})
}

module.exports = {
	ethSent
}
