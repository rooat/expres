var db = require('../mongoConfig');

addInvestor = (req, res, next) => {

	investor = {
		address : req.body.address,
		commodity: req.body.commodity,
		tradeTime : req.body.tradeTime
	}


	db.investorDetail.findOne({ address: investor.address })
		.then(function (response) {
			if (!response) {

				var investorVar = new db.investorDetail({
					"address": investor.address,
					"commodity": investor.commodity,
					"trade_time" : investor.tradeTime
				});
				investorVar.save()
					.then(function (response) {
						console.log(response);
						res.send({ 'status': 'added successfully' })
					})
					.catch(function (e) {
						res.send({ 'status': 'failure', Error: e });
					});
			}
			else {
				res.send({ 'status': 'Investor already exist' })
			}
		})
		.catch(function (e) {
			res.send({ 'status': e })
		})
};

module.exports = {
	addInvestor
}