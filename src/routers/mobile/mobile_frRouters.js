const router = require('express').Router();
const mobile_frController = require("../../controllers/mobile/mobile_frControllers");

router.get("/homepage", mobile_frController.getMobileHomepage);
//router.get('/comment/:id', mobile_frController.postComment)
router.post('/comment', mobile_frController.postComment);

router.post('/newcomment', mobile_frController.postNewComment);

router.get("/page/:name", mobile_frController.getPage);

router.get("/book-of-the-day", mobile_frController.getBookOfDay)

module.exports = router;