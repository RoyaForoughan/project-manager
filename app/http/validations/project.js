const { body } = require("express-validator");

function createProjectValidator(){
    return [
        body('title').notEmpty().withMessage('عنوان پروژه نمیتواند خالی باشد!'),
        body('tags').isArray({min:0 , max:10}).withMessage('حداکثر استفاده از تگ ها 10 عدد میباشد'),
        body('text').isLength({min:20}).withMessage('توضیحات پروژه نمیتواند خالی باشد و حداقل دارای 20 کارکتر باشد!')
    ]
}

module.exports={
    createProjectValidator
}