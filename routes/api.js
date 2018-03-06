var express = require('express');
var router = express.Router();
var multer = require('multer');
var middleware = multer();

var register_controller = require('../app/controllers/api/register/register_controller');
var forgot_password_controller = require('../app/controllers/api/register/forgot_password/forgot_password_controller');
var register_provider_controller = require('../app/controllers/api/register/register_provider_controller');
var upload_controller = require('../app/controllers/api/upload/upload_images_controller');
var send_confirm_controller = require('../app/controllers/api/send_email/confirm_register_controller');
var send_forgot_controller = require('../app/controllers/api/send_email/forgot_password_controller');
var login_controller = require('../app/controllers/api/login/login_controller');
var change_password_controller = require('../app/controllers/api/register/forgot_password/change_password_controller');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register', middleware.any(),register_controller.store);
router.post('/register/provider',  register_provider_controller.store);
router.get('/register/verify/:id', register_controller.verify);
router.delete('/register/delete/:id', register_controller.delete);
router.delete('/register/delete-overall', register_controller.delete_overall);

/* Api for login */
router.post('/email-login', login_controller.email_login);
router.post('/facebook-login', login_controller.facebook_login);

/* Api for forgot password */
router.post('/register/forgot-password', middleware.any(), forgot_password_controller.forgot_password);

/* Api for file image upload */
router.post('/upload-image', upload_controller.upload);

/* Api for send email */
router.post('/send-email/confirm-singup', send_confirm_controller.index);
router.post('/send-email/forgot-password', send_forgot_controller.index);

/* change password */
router.post('/change-password', change_password_controller.index);

module.exports = router;