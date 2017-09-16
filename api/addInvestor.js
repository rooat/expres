var db = require('../mongoConfig');
var axios = require('axios');
var request = require('request');
addInvestor = (req, res, next) => {

	investor = {
		address : req.body.address,
		commodity: req.body.commodity,
		tradeTime : req.body.tradeTime,
		timestamp : Math.floor(Date.now()/1000)
	}

	var investorVar = "";
	var price1,price2;

var apiLink = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";
axios.get(apiLink)
.then((response) => {

	if (response.status == 200) {
			console.log("price 1",response.data.USD);
			price1 = response.data.USD;
			setTimeout(function () {
				console.log('timeout completed'); 

				axios.get(apiLink)
				.then((response) => {
					console.log("price 2",response.data.USD);
					price2 = response.data.USD;
					 investorVar = new db.investorDetail({
						"address": investor.address,
						"commodity": investor.commodity,
						"trade_time" : investor.tradeTime,
						"timestamp1" : investor.timestamp,
						"timestamp2" : investor.timestamp + 60,
						"price1" :  price1,
						"price2" : price2,
						"tradeCompletionStatus" : false
					});
					investorVar.save()
					.then(function (response) {
						res.send({ 'status': 'added successfully' })
					})
				})
				.catch(function (e) {
					res.send({ 'status': 'failure', Error: e });
				});
				
			}, 5000);

	}
})
}
module.exports = {
	addInvestor
}