var config = require('../config');

class User {
	constructor(){
		
	}
	login = async (req, res, next) =>{
		if(req.session.is_logined = 0 || !req.session.userinfo){
			let user_name = req.body.user_name;
			let password = req.body.password;
			
			let cry_u = config.crypto.encrypt(config.cry_data.user_name.login_key,config.cry_data.user_name.login_VI,user_name);
			let user = await config.db.Users.findOne({
				"user_name": cry_u
			});
			if(user){
				let cry_p = config.crypto.decrypt(config.cry_data.password.pwd_key,config.cry_data.password.pwd_VI,user.password);
				if(cry_p == password){
					req.session.userinfo = user;
					req.session.is_logined = 1;
					return res.send({"resp":"ok"})
				}
				return res.send({"resp":"pwd invalid"})
			}
			return res.send({"resp":"user invalid"})
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
