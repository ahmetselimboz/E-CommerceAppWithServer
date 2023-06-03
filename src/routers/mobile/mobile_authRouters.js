const router = require("express").Router();
const mobile_authController = require("../../controllers/mobile/mobile_authController");
const mobile_accountController = require("../../controllers/mobile/mobile_account_controller");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");
const passport = require("../../config/google_auth");

router.get("/auth/falselogin", mobile_authController.getFalseLogin);
router.get("/auth/truelogin", mobile_authController.getTrueLogin);
router.post("/login", mobile_authController.postLogin);

router.post("/localDb", mobile_authController.refreshLocalDb);

router.get("/register", mobile_authController.getRegister);
router.post("/register", mobile_authController.postRegister);

//router.get("/verify", mobile_authController.emailVerify);

router.get("/logout", mobile_authController.getLogOut);

//router.get("/forget-password", mobile_authController.getForgetPassword);
router.post("/forget-password", mobile_authController.postForgetPassword);

router.get("/new-password", mobile_authController.getNewPassword);
router.get("/new-password/:id/:token", mobile_authController.getNewPassword);
router.post("/new-password", mobile_authController.postNewPassword);

router.get("/google", mobile_accountController.getGoogleAccount);
router.get(
  "/google/callback",  mobile_accountController.postGoogleAccount
 
);

router.get('/google/success', mobile_accountController.googleSuccess)

module.exports = router;
