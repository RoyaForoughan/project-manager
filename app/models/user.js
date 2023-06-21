const mongoose = require('mongoose')
const UserSchima = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String,required:true ,  unique:true},
    username:{type:String,required:true ,  unique:true},
    roles:{type:[String] , default:['USER']},
    mobile:{type:String,required:true , unique:true},
    password:{type:String,required:true},
    teams:{type:[mongoose.Types.ObjectId],default:[]},
    skills:{type:[String],default:[]},
    token:{type:String , default:''}
},{
    timestamps:true
})

const UserModel = mongoose.model('user' , UserSchima)

module.exports = {
    UserModel
}