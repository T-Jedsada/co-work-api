require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE]);

/* add feature */
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
    /*  */
    if(!user.name || !user.email || !user.password || !user.image){
        res.status(400);
        res.json({
            "success": false,
            "massage": "The details are not complete."
        });
    }
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.password = hash;
    });

    /* check email in database users */
    check_email = database.users.find(user.email);
    if (check_email){
        res.json({
            "success": false,
            "massage": "This email is already used."
        });
    }
    database.users.save(user, function(err, user){
        if(err){
            res.send(err);
        }
        res.json({
            "success": true,
            "data": user
        });
    });
};

/* Delete User Register */
exports.delete = function(req, res, next) {
    database.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json({
            "success": true,
            "data": user
        });
    });
};