var service = require('../service/service');

class UserController {
    constructor(){

    }
    async login(user_name , password){
        if(user_name && password){
            let login_res = await service.UserSerice.login(user_name,password)
            if(login_res == 10000){
                return {"code":10000,"msg":"login success","info":user_name}
            }
            if(login_res == 10001){
                return {"code":10001,"msg":"pasword invalid","info":user_name}
            }
            if(login_res == 10002){
                return {"code":10002,"msg":"user_name invalid","info":user_name}
            }
        }
        return {"code":10003,"msg":"params invalid","info":user_name}
    }
}
module.exports = new UserController;