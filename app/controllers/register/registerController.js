require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var base_response = require('../baseController');
var send_email = require('../send_email/verifyController');
var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE]);

/* List data in database */
exports.index = function(req, res, next) {
    database.users.find(function(err, users){
        if(err){
            res.json(base_response.error('Error: Not have information'));
        }
        res.json(base_response.success(users));
    });
};

/* Save Register */
exports.store = function(req, res, next) {
    var user = req.body;
    if(!user.name || !user.email || !user.password || !user.image){
        res.status(400);
        res.json(base_response.error('Error: The details are not complete.'));
    }
    /* hash password */
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash;
    });
    /* check email in database users */
    /*database.users.find({email: user.email}).toArray(function(err, result) {
        if (result){
            res.json(base_response.error('Error: This email is already used.'));
        }
    });*/
    /* insert data to database */
    database.users.save(user, function(err, user){
        if(err){
            res.json(base_response.error('Error: Can not save register'));
        }
        send_email.verifies(user);
        res.json(base_response.success(user));
    });
};

/* Delete User Register */
exports.delete = function(req, res, next) {
    database.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.json('Error: Can not delete user');
        }
        res.json(base_response.success(user));
    });
};

/* Update status */
exports.verify = function(req, res, next) {
    var status = true;
    var user = res.body;
    user.stats = status;
    database.users.update({_id: mongojs.ObjectId(req.params.id)},user, {}, function(err, user){
        if(err){
            res.json(base_response.error('Error: Have something wrong!'))
        }
        res.json(base_response.success(user));
    });
};
