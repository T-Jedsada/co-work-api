var test_model = require('../models/test_model');
var base_response = require('./base_controller');

exports.index = function(req, res, next) {
    /*
    * test_name
    * test_surname
    */

    return res.json(base_response.success('test success'));
};