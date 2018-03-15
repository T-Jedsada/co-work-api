
var base_response = require('../../base_controller');
exports.store = function(req, res, next) {
    return res.json(base_response.success('test'));
};