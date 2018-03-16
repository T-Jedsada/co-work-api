require('dotenv').config();
var mongojs = require('mongojs');
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