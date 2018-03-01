var express = require('express');
var router = express.Router();

var register_controller = require('../app/controllers/api/register/register_controller');
var forgot_password_controller = require('../app/controllers/api/register/forgot_password/forgot_password_controller');
var register_provider_controller = require('../app/controllers/api/register/register_provider_controller');
var image_controller = require('../app/controllers/api/upload/upload_images_controller');
var send_email_controller = require('../app/controllers/api/send_email/send_email_controller');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register' , register_controller.store);
router.post('/register/provider',  register_provider_controller.store);
router.get('/register/verify/:id', register_controller.verify);
router.delete('/register/delete/:id', register_controller.delete);
router.delete('/register/delete-overall', register_controller.delete_overall);
router.post('/register/upload',image_controller.uploaded);

/* Api for forgot password */
router.post('/register/forgot-password', forgot_password_controller.forgot_password);

/* Api for file image upload */


/* Api for send email */
router.post('/send-email',send_email_controller.index);

module.exports = router;