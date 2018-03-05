require('dotenv').config();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

/* List data in database */
exports.index = function(req, res, next) {
    var user = {};
    user.email = req.body.email;
    user.password = req.body.password;

    if(!user.email || !user.password){
        res.status(400);
        return res.json(base_response.error('The details are not complete.'));
    }
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;
    });
    database.users.update({_id: mongojs.ObjectId(req.params.id)}, { $set: { password: user.password } }, function (err, user) {
        if (err) {
            return res.json(base_response.error('Can not save change password'));
        }
        return res.json(base_response.success(user));
    });
};