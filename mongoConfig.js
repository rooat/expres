
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
mongoose.Promise= require('bluebird')
mongoose.connect('mongodb://localhost:27017/investorDetail',{"useMongoClient":true})


var schema1 = new mongoose.Schema({
     user_name: String,
     password: String
});

var Users = mongoose.model('users', schema1);

module.exports = {
	Users
}