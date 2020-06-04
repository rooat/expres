var config = require('../config');

class Banner {
	constructor(){
		this.key = "dagdkdjgdkjgjggg";
        this.VI = "kdgjkgjiekdkekee"
	}
	testApi = (req, res, next) => {
		if(req.session.is_logined == 1 && req.session.userinfo){
			console.log("testapi")
			let ss = config.crypto.encrypt(this.key, this.VI, "jj");
			let tim = config.format.formatTime(new Date().getTime());
			console.log("tim:",tim);
			return res.send({"resp": ss})	
		}
		return res.send({"resp":null});
	}
	
}

module.exports = Banner
