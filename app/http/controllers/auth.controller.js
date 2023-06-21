const { UserModel } = require("../../models/user")
const { hashString, tokenGenerator } = require("../../modules/function")
const bcrypt = require('bcrypt')
class AuthController{
    async register(req,res,next){
        try {
            const {username , password , email , mobile} = req.body
            const hashPassword = hashString(password)
            const user = await UserModel.create({username , email , password : hashPassword , mobile})
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next){
        try {
            const {username , password} = req.body
            const user = await UserModel.findOne({username})
            console.log(user);
            if(!user) throw {status:401 , message:'نام کاربری یا رمز عبور اشتباه میباشد!'}
            const compareResult = bcrypt.compareSync(password , user.password)
            if(!compareResult) throw{status:401 , message:'نام کاربری یا رمز عبور اشتباه میباشد!'}
            const token = tokenGenerator({username})
            user.token = token
            await user.save()
            return res.status(200).json({
                status:200,
                success:true,
                message:'شما با موفقیت وارد حساب کاربری خود شدید',
                token
            })
        } catch (error) {
            next(error)
        }
    }
    resetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController()
}