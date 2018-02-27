var express = require('express');
var router = express.Router();
var confirm_singup = require('../app/controllers/web/confirm_singup/confirm_singup_controller');

/* GET home page. */
router.get('/confirm-singup', confirm_singup.index);

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
