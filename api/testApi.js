var config = require('../config');
testApi = (req, res, next) => {
	if(req.session.is_logined == 1 && req.session.userinfo){
		console.log("testapi")
		return res.send({"resp":"hello"})	
	}
	return res.send({"resp":null});
}

login = async (req, res, next) =>{
	if(req.session.is_logined = 0 || !req.session.userinfo){
		req.session.is_logined = 1;
		let user = await config.db.Users.find();
		req.session.userinfo = user;
		return res.send({"resp":"ok"})
	}
	return res.send({"resp":"fail"});
}

logout =  async (req, res, next) =>{
	if(req.session.is_logined = 1 && req.session.userinfo){
		//注销session
		req.session.destroy();
		return res.send({"resp":"logout ok"});
	}
	return res.send({"resp":"fail"});
}

module.exports = 
{
	testApi,
	login,
	logout
}
