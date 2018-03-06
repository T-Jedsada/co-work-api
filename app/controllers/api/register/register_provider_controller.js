require('dotenv').config();
var password_hash = require('password-hash');
var mongojs = require('mongojs');
var is_email = require("email-validator");
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

/* Save Register */
exports.store = function(req, res, next) {
    var user_form = req.body;
    var user = {};

    if(!user_form.name || !user_form.email || !user_form.password || !user_form.image){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    if (is_email.validate(user_form.email) === false){
        return res.json(base_response.error('Email not have @address.'));
    }

    user.name = user_form.name;
    user.email = user_form.email;
    user.password = password_hash.generate(user_form.password);
    user.status = false;
    user.rolse = 'provider';
    user.image = user_form.image;

    database.users.findOne({email: user.email}, function(err, req) {
        if (req){
            return res.json(base_response.error('This email is already used'));
        }
        database.users.save(user, function (err, user) {
            if (err) {
                return res.json(base_response.error('Can not save register'));
            }
            return res.json(base_response.success(user));
        });
    });
};

/* Update status register*/
exports.verify = function(req, res, next) {
    database.users.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { status: true } }, function(err, user){
        if(err){
            return res.json(base_response.error('Have something wrong!'))
        }
        return res.json(base_response.success(user));
    });
};