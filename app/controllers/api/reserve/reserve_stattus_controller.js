require('dotenv').config();
var mongojs = require('mongojs');
var base_response = require('../../base_controller');

var database = mongojs(process.env.CONFIG_DATABASE);

exports.index = function (req, res, next) {
    get_data = {};
    size_s = {};
    size_m = {};
    size_l = {};

    database.room.find({co_work_id: req.body.co_work_id, pending: false}, function (err, result) {
        if (result.nModified === "0") {
            return res.json(base_response.error('Have something wrong'));
        }

        size_s.amount = 5;
        size_s.price = 500;
        size_m.amount = 5;
        size_m.price = 500;
        size_l.amount = 5;
        size_l.price = 500;

        get_data.s = size_s;
        get_data.m = size_m;
        get_data.l = size_l;

        return res.json(base_response.success(get_data));
    });
};

exports.store = function (req, res, next) {
    database.room.save(req.body, function (err, result) {
        if (result.nModified === "0") {
            return res.json(base_response.error('Dude, You cant even delete it.'));
        }
        return res.json(base_response.success(result));
    });
};