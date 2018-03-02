require('dotenv').config();
var mongojs = require('mongojs');
var base_response = require('../../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

/* Save Register */
exports.index = function(req, res, next) {

};

exports.forgot_password = function(req, res, next) {
    var user = req.body;
    database.users.findOne({email: user.email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('This email do not sing up')) ;
        }
        return res.json(base_response.success(user));
    });
};