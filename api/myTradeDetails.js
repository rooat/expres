var db = require('../mongoConfig');
var axios = require('axios');

myTradeDetails = (req, res, next) => {

    // var address = req.body.myAddress;

    console.log("fetchMYdetails");
    db.investorDetail.find({address : req.body.myAddress,tradeCompletionStatus : true})
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
	myTradeDetails
}
