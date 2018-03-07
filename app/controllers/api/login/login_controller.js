require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.email_login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }

    database.users.findOne({email: email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('Do not have this email in system.'));
        }
        if (passwordHash.verify(password, user.password) === false){
            return res.json(base_response.error('Password not mate.'));
        }
        return res.json(base_response.success(user));
    });
};

exports.facebook_login = function(req, res, next) {
    var facebook_id = req.body.facebook_id;
    if(!facebook_id){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    database.users.findOne({facebook_id: facebook_id}, function(err, user) {
        if (!user){
            return res.json(base_response.error('Do not have this facebook in system.'));
        }
        return res.json(base_response.success(user));
    });
};