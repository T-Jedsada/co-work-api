var test_model = require('../models/test_model');
var base_response = require('./base_controller');

exports.index = function(req, res, next) {
    new test_model(req.body).save(user, function (err, user) {
        if (err) {
            return res.json(base_response.error('Can not save register'));
        }
        return res.json(base_response.success(user));
    });
};