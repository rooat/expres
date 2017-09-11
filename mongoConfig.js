
var mongoose = require('mongoose')
mongoose.Promise= require('bluebird')
mongoose.connect('mongodb://localhost:27017/contacts')

var schema1 = new mongoose.Schema({
	 address : String,
     commodity : String ,
     trade_time : String
});

var investorDetail = mongoose.model('investorDetail', schema1);

module.exports = {
	investorDetail
}