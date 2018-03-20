require('dotenv').config();
var mongojs = require('mongojs');
var base_response = require('../../base_controller');
var database = mongojs(process.env.CONFIG_DATABASE);

exports.judgeMentCowork = function (req, res, next) {
    database.coworking.update({ _id: mongojs.ObjectId(req.body.co_work_id) }, { $set: { status: "reject" } }, function (err, result) {
        if (err) {
            return res.json('Dude, You cant even delete it.');
        }
        return res.json(base_response.success('Complete ;C'));
    });
}

exports.approveCoWork = function (req, res, next) {
    database.coworking.update({ _id: mongojs.ObjectId(req.body.co_work_id) }, { $set: { status: "true" } }, function (err, result) {
        if (err) {
            return res.json(base_response.error('Dude, You cant even do it.'));
        }
        return res.json(base_response.success('Complete ;D'));
    });
}

exports.showComment = function (req, res, next) {
    console.log(req.body.id);
    database.comment.find({ coworking_id: req.body.id, status: "true" }, function (err, result) {
        if (err) {
            return res.json(base_response.error('Dude, You cant even do it.'));
        }
        return res.json(base_response.success(result));
    });
}

exports.judgeMentComment = function (req, res, next) {
    database.comment.update({ _id: mongojs.ObjectId(req.body.id) }, { $set: { status: "reject" } }, function (err, result) {
        if (err) {
            return res.json(base_response.error('Dude, You cant even do it.'));
        }
        return res.json(base_response.success('Complete ;D'));
    });
}

exports.showListCoWork = function (req, res, next) {
    database.coworking.find({}, { _id: 1, gellery: 1, name: 1, rarting: 1, address: 1, status: 1 }, function (err, result) {
        if (result[0] == null) {
            return res.json(base_response.error('Not have information.'));
        }
        return res.json(base_response.success(result));
    });
};

exports.showUserDetail = function (req, res, next) {
    database.users.find({ _id: mongojs.ObjectId(req.body.id) }, { _id: 1, image: 1, name: 1 }, function (err, result) {
        if (result[0] == null) {
            return res.json(base_response.error('Not have information.'));
        }
        return res.json(base_response.success(result));
    });
}