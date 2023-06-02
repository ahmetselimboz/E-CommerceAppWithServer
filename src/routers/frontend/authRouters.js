const router = require("express").Router();
const authController = require("../../controllers/frontend/authControllers");
const accountController = require("../../controllers/frontend/accountController");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");
const passport = require("../../config/google_auth");

router.get("/login", isAuthanticated.no, authController.getLogin);
router.post("/login", validations.validateLogin(), authController.postLogin);

router.get("/register", isAuthanticated.no, authController.getRegister);
router.post(
  "/register",
  validations.validateNewUser(),
  authController.postRegister
);

router.get("/verify", authController.emailVerify);
router.get("/email-confirmed", authController.getEmailConfirmed);

router.get("/forget-password", authController.getForgetPassword);
router.post(
  "/forget-password",
  validations.validateEmail(),
  authController.postForgetPassword
);

router.get("/new-password", authController.getNewPassword);
router.get("/new-password/:id/:token", authController.getNewPassword);
router.post(
  "/new-password",
  validations.validateNewPassword(),
  authController.postNewPassword
);

router.get(
  "/google",
  accountController.getGoogleAccount
);
router.get(
  "/google/callback",accountController.postGoogleAccount
  
);

router.get("/facebook", accountController.getFacebook);
router.get("/facebook/callback", accountController.postFacebook);

router.get("/twitter", accountController.getTwitter);
router.get("/twitter/callback", accountController.postTwitter);


router.get("/logout", authController.getLogOut);
module.exports = router;
