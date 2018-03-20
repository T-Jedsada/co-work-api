require('dotenv').config();
var mongojs = require('mongojs');
var password_hash = require('password-hash');
var is_email = require("email-validator");
var base_response = require('../../base_controller');
var users_model  = require('../../../models/users_model');

exports.provider_login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    if (!is_email.validate(email)){
        return res.json(base_response.error('Email not have @address.'));
    }

    database.users.findOne({email: email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('Do not have this email in system.'));
        }
        if (!password_hash.verify(password, user.password)){
            return res.json(base_response.error('Password not mate.'));
        }
        if (user.role !== 'provider') {
            return res.json(base_response.error('You are not provider.'));
        }
        return res.json(base_response.success(user));
    });
};