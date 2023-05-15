const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")

router.get('/homepage', frontController.getHomePage);

module.exports = router;