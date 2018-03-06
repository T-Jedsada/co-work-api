require('dotenv').config();
var mongojs = require('mongojs');
var is_email = require("email-validator");
var base_response = require('../../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.forgot_password = function(req, res, next) {
    var email = req.body.email;
    if (!email){
        return res.json(base_response.error('The details are not complete.'));
    }
    if (is_email.validate(email) === false){
        return res.json(base_response.error('Email not have @address.'));
    }
    database.users.findOne({email: email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('This email do not sing up')) ;
        }
        return res.json(base_response.success(user));
    });
};