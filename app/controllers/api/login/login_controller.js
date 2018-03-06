require('dotenv').config();
var mongojs = require('mongojs');
var passwordHash = require('password-hash');
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

/* List data in database */
exports.login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }

    database.users.findOne({email: email}, function(err, user) {
        if (!user){
            return res.json(base_response.error('Do not have this email in system.'));
        }
        if (passwordHash.verify(password, user.password) === false){
            return res.json(base_response.error('Password not mate.'));
        }
        return res.json(base_response.success(user));
    });
};