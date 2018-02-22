var express = require('express');
var router = express.Router();

var register_controller = require('../app/controllers/register/registerController');

/* Api for register */
router.get('/register', register_controller.index);
router.post('/register', register_controller.store);
router.delete('/register/delete/:id', register_controller.delete);

//fvdf
module.exports = router;