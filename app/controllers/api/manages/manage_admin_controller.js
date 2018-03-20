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
    database.comment.update({ _id: mongojs.ObjectId(req.body.id) }, { $set: { status: "true" } }, function (err, result) {
        if (err) {
            return res.json(base_response.error('Dude, You cant even do it.'));
        }
        return res.json(base_response.success('Complete ;D'));
    });
}