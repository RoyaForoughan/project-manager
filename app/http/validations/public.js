const { param } = require("express-validator");

function mongoIDValodator(){
    return[
        param('id').isMongoId().withMessage('شناسه ارسال شده صحیح نمیباشد!')
    ]
}

module.exports = {
    mongoIDValodator
}