const fileUpload = require('express-fileupload')
const { createUploadPath } = require('./function')
const path = require('path')

const uploadFile = (req,res,next) =>{
    try {
        if(req.file || Object.keys(req.files).length == 0) throw {status:400 , message:'عکس شاخص پروژه را را راسال نماییدی'}
        let image = req.files.image
        const image_path = path.join(createUploadPath() , (Date.now() + path.extname(image.name)))
        req.body.image = image_path
        let uploadPath = path.join(__dirname , '..' , '..' , image_path)
        image.mv(uploadPath , (err)=>{
            if(err) throw{status:500 , message:'بارگزاری تصویر انجام نشد'}
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadFile
}