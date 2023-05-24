const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")

router.get('/homepage', frontController.getHomePage);
router.get('/details/:id', frontController.getDetails);
router.post('/details', frontController.postDetails);

module.exports = router;