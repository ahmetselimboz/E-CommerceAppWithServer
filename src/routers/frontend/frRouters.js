const router = require('express').Router();
const frontController = require("../../controllers/frontend/frControllers")
const validations = require('../../middlewares/validations');
const isAuthenticated = require("../../middlewares/isAuthanticated");
const multer = require("multer");
const upload = multer();

router.get('/', frontController.getHomePage);
router.get('/homepage', frontController.getHomePage);
router.get('/images',frontController.getImages);
router.post('/images',upload.any(), frontController.postImages);
router.get('/details/:id', frontController.getDetails);


router.post('/comment',  validations.validateNewComment(), isAuthenticated.yes, frontController.postComment);

router.get('/comment/:id', frontController.getAllComments);

router.get("/page/:name/:pg", frontController.getPage);

module.exports = router;