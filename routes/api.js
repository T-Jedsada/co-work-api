var express = require('express');
var router = express.Router();
var register_controller = require('../app/controllers/register/register_controller');
var image_controller = require('../app/controllers/upload/upload_images_controller');
var send_email_controller = require('../app/controllers/send_email/send_email_controller');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register', register_controller.store);
router.get('/register/verify/:id', register_controller.verify);
router.delete('/register/delete/:id', register_controller.delete);

/* Api for file image upload */
router.post('/upload-image',image_controller.upload);

/* Api for send email */
router.post('/send-email',send_email_controller.index);
module.exports = router;