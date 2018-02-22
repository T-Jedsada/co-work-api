var mongojs = require('mongojs');

var database = mongojs('mongodb://root:root@ds245228.mlab.com:45228/cowork', ['users']);

// Display list of all Authors.
exports.list = function(req, res, next) {
    database.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
};