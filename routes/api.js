var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var database = mongojs('mongodb://root:root@ds245228.mlab.com:45228/cowork', ['users']);



var register_controller = require('../app/controllers/register/registerController');
router.get('/register', register_controller.list);


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
            "success": "fail",
            "massage": "Eroor 400"
        });
    } else {
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
});

module.exports = router;