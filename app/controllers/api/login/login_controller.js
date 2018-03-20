require('dotenv').config();
var mongojs = require('mongojs');
var password_hash = require('password-hash');
var is_email = require("email-validator");
var base_response = require('../../base_controller');
var users_model  = require('../../../models/users_model');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.email_login = function(req, res, next) {
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
        if (user.status === false){
            return res.json(base_response.error('Account not verify'))
        }
        return res.json(base_response.success(new users_model(user)));
    });
};

exports.admin_login = function(req, res, next) {
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
        if (password_hash.verify(password, user.password) === false){
            return res.json(base_response.error('Password not match.'));
        }
        if (user.role !== 'admin') {
            return res.json(base_response.error('You are not admin.'));
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
        if (user.status === false){
            return res.json(base_response.error('Account not verify'));
        }
        return res.json(base_response.success(user));
    });
};