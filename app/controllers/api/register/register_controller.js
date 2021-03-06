require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

exports.index = function(req, res, next) {
    database.users.find(function(err, users){
        if(err){
            res.json(base_response.error('Not have information'));
        }
        res.json(base_response.success(users));
    });
};

exports.store = function(req, res, next) {
    var user_form = req.body;
    var user = {};

    user.name = user_form.name;
    user.email = user_form.email;
    user.password = user_form.password;
    user.image = user_form.image;
    user.status = false;
    user.facebook_id = user_form.facebook_id;

    /*if(!user.name || !user.email || !user.password || !user.image){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }*/
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;
    });
    database.users.findOne({email: user.email}, function(err, req) {
        if (req){
            return res.json(base_response.error('This  email is already used'));
        }
        database.users.save(user, function (err, user) {
            if (err) {
                return res.json(base_response.error('Can not save register'));
            }
            return res.json(base_response.success(user));
        });
    });
};

exports.delete = function(req, res, next) {
    database.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            return res.json('Can not delete user');
        }
        return res.json(base_response.success(user));
    });
};

exports.delete_overall = function(req, res, next) {
    database.users.remove({},function(err, user){
        if(err){
            return res.json('Can not delete user');
        }
        return res.json(base_response.success(user));
    });
};

exports.verify = function(req, res, next) {
    database.users.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { status: true } }, function(err, user){
        if(err){
            return res.json(base_response.error('Have something wrong!'))
        }
        return res.json(base_response.success(user));
    });
};