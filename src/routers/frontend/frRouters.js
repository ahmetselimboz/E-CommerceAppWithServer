const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")

router.get('/homepage', frontController.getHomePage);
router.get('/details/:id', frontController.getDetails);


router.post('/comment', frontController.postComment);

router.get('/comment/:id', frontController.getAllComments);

module.exports = router;