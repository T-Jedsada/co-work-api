var base_response = require('../../base_controller');
var mongoose = require ("mongoose");

exports.store = function(req, res, next) {

    return res.json(base_response.success(list_cowork_form.status.name));
};