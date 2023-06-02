const router = require('express').Router();
const mobile_authController = require("../../controllers/mobile/mobile_authController");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");

router.get('/auth/falselogin',  mobile_authController.getFalseLogin);
router.get('/auth/truelogin',  mobile_authController.getTrueLogin);
router.post('/login',  mobile_authController.postLogin);

router.get('/register',  mobile_authController.getRegister);
router.post('/register',  mobile_authController.postRegister);

//router.get("/verify", mobile_authController.emailVerify);

router.post('/logout' , mobile_authController.getLogOut);

//router.get("/forget-password", mobile_authController.getForgetPassword);
router.post("/forget-password", mobile_authController.postForgetPassword);

router.get("/new-password", mobile_authController.getNewPassword);
router.get("/new-password/:id/:token", mobile_authController.getNewPassword);
router.post("/new-password",  mobile_authController.postNewPassword);


module.exports = router;