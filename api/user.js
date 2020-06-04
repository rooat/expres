var config = require('../config');

class User {
	constructor(){
		
	}
	login = async (req, res, next) =>{
		if(req.session.is_logined = 0 || !req.session.userinfo){
			let user_name = req.body.user_name;
			let password = req.body.password;
			if(user_name && password){
				let user_login = await config.common.UserController.UserController.login(user_name,password);
				if(user_login.code == 10000){
					req.session.is_logined = 1;
					req.session.userinfo = user_name;
				}
				return res.send({"resp":user_login});
			}
			return res.send({"resp":"params invalid"});
		}
		return res.send({"resp":"has logined"});
	}
	
	logout =  async (req, res, next) =>{
		if(req.session.is_logined = 1 && req.session.userinfo){
			//注销session
			req.session.destroy();
			return res.send({"resp":"logout ok"});
		}
		return res.send({"resp":"fail"});
	}
	
}

module.exports = User
