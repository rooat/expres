var model = require('../model/model');
var cryp = require('../utils/crypto_util')
var cryp_data = require('../conf/crypto.json');

class UserService {
    constructor(){
    }
    async login(user_name, password){
        let user = await model.UserModel.findUser(user_name);
        if(user){
            let cry_p = cryp.decrypt(cryp_data.password.pwd_key,cryp_data.password.pwd_VI,user.password);
            if(cry_p == password){
                return 10000
            }
            return 10001
        }
        return 10002;
    }
}
module.exports = new UserService();