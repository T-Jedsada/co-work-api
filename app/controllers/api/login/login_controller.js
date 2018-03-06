require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var base_response = require('../../base_controller');
var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.index = function(req, res, next) {
    return res.json(base_response.error('this test'))
};

exports.login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if(!email || !password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    bcrypt.hash(password, 10, function (err, hash) {
        password = hash;
    });
    database.users.findOne({email: email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('Do not have this email in system.'));
        }
        /*if (user.password !== password){
            return res.json(base_response.error('Password not mate.'))
        }*/
        return res.json(base_response.success(user));
    });
};