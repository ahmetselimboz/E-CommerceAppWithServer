const { body } = require("express-validator");

const validateNewComment = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Başlık alanını boş geçmeyiniz"),
    body("desc")
      .trim()
      .notEmpty()
      .withMessage("Açıklama alanını boş geçmeyiniz"),
    body("rank")
      .trim()
      .notEmpty()
      .withMessage("Lütfen puan vermeden geçmeyiniz"),
  ];
};

const validateLogin = () => {
  return [
    body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz"),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Hatalı şifre girdiniz")
      .isLength({ max: 20 })
      .withMessage("Hatalı şifre girdiniz"),
  ];
};

const validateNewUser = () => {
  return [
    body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz"),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Şifreniz en az 4 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Şifreniz en fazla 20 karakter olmalıdır"),

    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("İsminiz en az 2 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("İsminiz en fazla 30 karakter olmalıdır"),

    body("surname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Soyisminiz en az 2 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Soyisminiz en fazla 20 karakter olmalıdır"),

    body("repassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Sifreler aynı değil");
        }
        return true;
      }),
  ];
};

const validateEmail = () => {
  return [
    body("email")
      .trim()

      .isEmail()
      .withMessage("Mailinizi doğru girdiğinizden emin olunuz."),
  ];
};

const validateNewPassword = ()=>{
  return [
    body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Şifreniz en az 4 karakter olmalıdır")
    .isLength({ max: 20 })
    .withMessage("Şifreniz en fazla 20 karakter olmalıdır"),

    body("repassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Sifreler aynı değil");
      }
      return true;
    }),
  ]
}

module.exports = {
  validateNewComment,
  validateLogin,
  validateNewUser,
  validateEmail,
  validateNewPassword
};
