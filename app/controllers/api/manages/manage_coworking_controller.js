require('dotenv').config();
var mongojs = require('mongojs');
var base_response = require('../../base_controller');
var database = mongojs(process.env.CONFIG_DATABASE);

exports.delete = function(req, res, next) {
    database.coworking.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, result){
        if(err){
            return res.json('Can not delete co-working');
        }
        return res.json(base_response.success(result));
    });
};

exports.delete_overall = function(req, res, next) {
    database.coworking.remove({},function(err, result){
        if(err){
            return res.json('Can not delete co-working');
        }
        return res.json(base_response.success(result));
    });
};