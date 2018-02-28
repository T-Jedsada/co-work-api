var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();

var register_controller = require('../app/controllers/api/register/register_controller');
var register_provider_controller = require('../app/controllers/api/register/register_provider_controller');
var image_controller = require('../app/controllers/api/upload/upload_images_controller');
var send_email_controller = require('../app/controllers/api/send_email/send_email_controller');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register', upload.any(), register_controller.store);
router.post('/register/provider',  register_provider_controller.store);
router.get('/register/verify/:id', register_controller.verify);
router.delete('/register/delete/:id', register_controller.delete);
router.delete('/register/delete-overall', register_controller.delete_overall);

/* Api for file image upload */
router.post('/upload',image_controller.uploaded);

/* Api for send email */
router.post('/send-email',send_email_controller.index);

module.exports = router;