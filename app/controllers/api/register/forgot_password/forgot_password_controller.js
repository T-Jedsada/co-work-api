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
    if (!is_email.validate(email)){
        return res.json(base_response.error('Email not have @address.'));
    }
    database.users.findOne({email: email}, { _id: 1, email: 1, status: 1}, function(err, user) {
        if (!user){
            return res.json(base_response.error('This email do not sing up')) ;
        }
        if (user.status === false){
            return res.json(base_response.error('Account not verify'))
        }
        return res.json(base_response.success(user));
    });
};