require('dotenv').config();
var mongojs = require('mongojs');
var password_hash = require('password-hash');
var base_response = require('../../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.index = function(req, res, next) {
    if(!req.body.password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    if (res.body.password.length < 6){
        return res.json(base_response.error('Password length less than six.'));
    }
    var password = password_hash.generate(req.body.password);
    database.users.update({_id: mongojs.ObjectId(req.params.id)}, { $set: { password: password } }, function (err, user) {
        if (err) {
            return res.json(base_response.error('Can not save change password'));
        }
        return res.json(base_response.success('Reset password  successfully.'));
    });
};