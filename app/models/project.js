const mongoose = require('mongoose')
const ProjectSchima = new mongoose.Schema({
    title:{type:String,required:true},
    text:{type:String},
    image:{type:String,default:'./defaults/default.JPG'},
    owner:{type:mongoose.Types.ObjectId,required:true},
    team:{type:mongoose.Types.ObjectId},
    private:{type:Boolean,default:true},
    tags:{type:[String] , default:[]}
},{
    timestamps:true
})

const ProjectModel = mongoose.model('project' , ProjectSchima)

module.exports = {
    ProjectModel
}