var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index.html');
  res.send('Hallo world');
});

router.get('/confirm-singup', function(req, res, next) {
    res.sendfile('views/index.html');
});

module.exports = router;
