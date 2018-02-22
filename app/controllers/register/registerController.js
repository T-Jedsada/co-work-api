var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

var database = mongojs('mongodb://root:root@ds245228.mlab.com:45228/cowork', ['users']);

/* List data in database */
exports.index = function(req, res, next) {
    database.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
};

/* Save Register */
exports.store = function(req, res, next) {
    var user = req.body;
    if(!user.name || !user.email || !user.password || !user.image){
        res.status(400);
        res.json({
            "success": "fail",
            "massage": "Eroor 400"
        });
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            user.password = hash;
        });
        database.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json({
                "success": "true",
                "data": user
            });
        });
    }
};

/* Delete User Register */
exports.delete = function(req, res, next) {
    database.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json({
            "success": "true",
            "data": user
        });
    });
};