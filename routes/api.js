var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var database = mongojs('mongodb://root:root@ds245228.mlab.com:45228/cowork', ['users']);

/* List data in database */
router.get('/', function(req, res, next) {
    database.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
    //res.send('ffff');
});

//Save Register
router.post('/', function(req, res, next){
    var user = req.body;
    if(!user.name || !user.email || !user.password || !user.image){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        database.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

module.exports = router;