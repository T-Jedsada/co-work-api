var express = require('express');
var router = express.Router();
var confirm_singup = require('../app/controllers/web/confirm_singup/confirm_singup_controller');
var verify_singup = require('../app/controllers/web/confirm_singup/verify_controller');

router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET confirm page. */
router.get('/confirm-singup/:id', confirm_singup.index);

/* Verify sing up */
router.get('/verify/:id', verify_singup.verify);

module.exports = router;