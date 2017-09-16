
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
mongoose.Promise= require('bluebird')
mongoose.connect('mongodb://localhost:27017/investorDetail')

// var promise = mongoose.connect('mongodb://localhost:27017/investorDetail', {
//     useMongoClient: true,
//     /* other options */
//   });

var schema1 = new mongoose.Schema({
	 address : String,
     commodity : String ,
     trade_time : { type: Number, min: 1, max: 5 },
     timestamp1 : Number,
     timestamp2 : Number,
     price1 : Number,
     price2 : Number,
     tradeCompletionStatus : Boolean
});

var investorDetail = mongoose.model('investorDetail', schema1);

module.exports = {
	investorDetail
}