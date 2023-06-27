const router = require("express").Router();
const mobile_authController = require("../../controllers/mobile/mobile_authController");
const mobile_accountController = require("../../controllers/mobile/mobile_account_controller");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");
const passport = require("../../config/google_auth");

router.post("/login", mobile_authController.postLogin);

router.post("/localDb", mobile_authController.refreshLocalDb);
router.post("/getGoogleInfo", mobile_authController.getGoogleInfo);


router.post("/register", mobile_authController.postRegister);

//router.get("/verify", mobile_authController.emailVerify);

router.get("/logout", mobile_authController.getLogOut);

//router.get("/forget-password", mobile_authController.getForgetPassword);
router.post("/forget-password", mobile_authController.postForgetPassword);

router.get("/new-password", mobile_authController.getNewPassword);
router.get("/new-password/:id/:token", mobile_authController.getNewPassword);
router.post("/new-password", mobile_authController.postNewPassword);

router.post("/google", mobile_authController.postNewGoogle)

router.get("/favorites/:userId", mobile_authController.getFavorites);
router.get("/deletefavorite/:userId/:bookId",mobile_authController.deleteFavorite);
router.post("/addfavorite",mobile_authController.addFavorite);


//router.get("/profile", mobile_authController.getProfile);
router.post("/profile",mobile_authController.postProfile);

//router.get("/updatePassword",mobile_authController.getUpdatePassword);
router.post("/updatePassword",mobile_authController.postUpdatePassword);


//yol + /mobile/auth/updatePassword



module.exports = router;
