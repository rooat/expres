var db = require('./db');
var cryp = require('../utils/crypto_util')
var cryp_data = require('../conf/crypto.json');

class UserModel {
    constructor(){

    }
    async findUser(user_name){
        let cry_u = cryp.encrypt(cryp_data.user_name.login_key,cryp_data.user_name.login_VI,user_name);
        let user = await db.Users.findOne({"user_name":cry_u});
        if(user){
            return user;
        }
        return null;
    }
}
module.exports =new UserModel();