const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")

router.get('/homepage', frontController.getHomePage);
router.get('/details/:id', frontController.getDetails);

module.exports = router;