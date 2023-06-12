const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")
const validations = require('../../middlewares/validations');
const isAuthenticated = require("../../middlewares/isAuthanticated");

router.get('/homepage', frontController.getHomePage);
router.get('/details/:id', frontController.getDetails);


router.post('/comment',  validations.validateNewComment(), isAuthenticated.yes, frontController.postComment);

router.get('/comment/:id', frontController.getAllComments);

router.get("/page/:name/:pg", frontController.getPage);

module.exports = router;