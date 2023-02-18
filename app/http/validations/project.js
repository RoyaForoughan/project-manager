const { body } = require("express-validator");

function createProjectValidator(){
    console.log('createProjectValidator');
    return[
        body('title').notEmpty().withMessage('عنوان پروژه نمیتواند خالی باشد'),
        body('text').notEmpty().isLength({min:20}).withMessage('توضیحات پروژه نمیتواند خالی باشد و حداقل باید حداقل 25 کاراکتر باشد!')
    ]
}

module.exports = {
    createProjectValidator
}