const router = require('express').Router();
const mobile_authController = require("../../controllers/mobile/mobile_authController");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");

//router.get('/login',  mobile_authController.getLogin);
router.post('/login',  mobile_authController.postLogin);

router.get('/register',  mobile_authController.getRegister);
router.post('/register',  mobile_authController.postRegister);

router.get("/verify", mobile_authController.emailVerify);

router.get('/logout' , mobile_authController.getLogOut);
module.exports = router;