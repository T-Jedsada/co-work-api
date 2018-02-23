var express = require('express');
var router = express.Router();
var register_controller = require('../app/controllers/register/registerController');
var image_controller = require('../app/controllers/upload/imageController');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register', register_controller.store);
router.delete('/register/delete/:id', register_controller.delete);

/* Api for file image upload */
router.post('/upload-image',image_controller.upload);

module.exports = router;