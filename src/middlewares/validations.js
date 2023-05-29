const {body} = require("express-validator");

const validateNewUser = ()=>{
    return [
        body("title").trim().notEmpty().withMessage('Başlık alanını boş geçmeyiniz'),
        body("desc").trim().notEmpty().withMessage('Açıklama alanını boş geçmeyiniz'),
        body("rank").trim().notEmpty().withMessage('Lütfen puan vermeden geçmeyiniz'),
    ]
}

module.exports = {
    validateNewUser,
    
}