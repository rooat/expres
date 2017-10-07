var db = require('../mongoConfig');
var axios = require('axios');
var webipc = require('../webipc');
var webrpc = require('../webrpc');

var ABI = require('../contracts/mvpABI.json');
var MVPcontract =  web3.eth.contract(ABI).at('0x77bd8858b05086f007146889d58c873aa96603dd');
controllerAddress = '0xc7128c185ef4043e0150a8fa8950b62e672468dc';
controllerKey = 'secretPhrase';

ethSentBitcoin = (req, res, next) => {


	var apiLink = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";
	axios.get(apiLink)
	.then((response) => {
	
		if (response.status == 200) {
				
				var Price1 = parseInt(response.data.USD * 100);
				console.log("price 1",Price1);
				var Timestamp1 = Math.floor(Date.now()/1000);
				console.log()
				var Timestamp2 = Timestamp1 + (req.session.tradeTime * 60);
				setTimeout(function () {
					console.log('tradeTime completed'); 
	
					axios.get(apiLink)
					.then((response) => {
						var Price2 = parseInt(response.data.USD * 100);
						console.log("price 2",Price2);
						var resl;
						if(req.session.tradeSelection == 1 && Price2 > Price1)
							{ resl = "Win";}
						else if (req.session.tradeSelection == 1 && Price2 < Price1)
							{ resl = "Lost";}
						else if (req.session.tradeSelection == 2 && Price2 < Price1)
							{ resl = "Win";}
						else if (req.session.tradeSelection == 2 && Price2 > Price1)
							{ resl = "Lost";}
						else {resl = "Draw";}
						
						db.investorDetail.findOneAndUpdate({ address : req.session.address, tradeCompletionStatus : false , commodity : 'BTC'},
							{$set:{price1:Price1, price2:Price2, timestamp1:Timestamp1, timestamp2:Timestamp2, tradeCompletionStatus :true, result : resl}}, 
							{new: true})
						.then((response) => {
	
							console.log(response);
	
								web3.personal.unlockAccount(controllerAddress,controllerKey, (err, unlocked) => {
									if (!unlocked) {
										console.log("account could not be unlocked");
										return res.status(500).send();
									}
									else {
	
										MVPcontract.result(response.address,response.price1,response.price2,response.tradeSelection,{ from: controllerAddress, gas: 200000 },(err, txid) => {
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
	ethSentBitcoin
}
