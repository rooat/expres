var db = require('../mongoConfig');
var axios = require('axios');

tradeDetails = (req, res, next) => {
    console.log("fetchdetails")
    db.investorDetail.find({tradeCompletionStatus : true})
    .then((response) => {
        console.log(response.length);
        var len = response.length;
        if (len <= 15)
            {
                res.send ({'resp' : response})
            }
            else
            {
                response = response.slice((len-15),len);
                res.send ({'resp' : response})
            }
})
		
}

module.exports = {
	tradeDetails
}
