const router = require('express').Router();
const authController = require("../../controllers/frontend/authControllers");
const validations = require("../../middlewares/validations");
const isAuthanticated = require("../../middlewares/isAuthanticated");

router.get('/login', isAuthanticated.no, authController.getLogin);
router.post('/login', validations.validateLogin(), authController.postLogin);

router.get('/register', isAuthanticated.no, authController.getRegister);
router.post('/register', validations.validateNewUser(), authController.postRegister);



router.get('/logout' , authController.getLogOut);
module.exports = router;