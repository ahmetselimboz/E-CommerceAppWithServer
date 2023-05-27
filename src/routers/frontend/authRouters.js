const router = require('express').Router();
const authController = require("../../controllers/frontend/authControllers");


router.get('/login',  authController.getLogin);
router.get('/signin',  authController.getRegister);

module.exports = router;