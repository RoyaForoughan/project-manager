const { UserModel } = require("../../models/user")
const { verifyJwtToken } = require("../../modules/functions")

const checkLogin = async(req,res,next) =>{
   try {
    console.log('checkLogin');
    let autError = {status : 401 , message : 'لطفا وارد حساب کاربری خود شوید'}
    const authorization = req?.headers?.authorization
    if(!authorization) throw autError
    let token = authorization.split(' ')?.[1]
    if(!token) throw autError
    const result = verifyJwtToken(token)
    const {username} = result
    const user = await UserModel.findOne({username} , {password : 0})
    if(!user) throw autError
    req.user = user
    return next()
   } catch (error) {
        next(error)
   }
}

module.exports = {
    checkLogin
}