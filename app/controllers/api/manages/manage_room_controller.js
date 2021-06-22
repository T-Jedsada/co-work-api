require('dotenv').config();
var mongojs = require('mongojs');
var base_response = require('../../base_controller');
var database = mongojs(process.env.CONFIG_DATABASE);

exports.index = function (req, res, next) {
    database.room.find({}, function (err, result) {
        if (result.nModified === "0") {
            return res.json(base_response.error('Dude, You cant even delete it.'));
        }
        return res.json(base_response.success(result));
    });
};