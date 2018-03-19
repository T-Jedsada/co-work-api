require('dotenv').config();
var mongojs = require('mongojs');
var database = mongojs(process.env.CONFIG_DATABASE);
var base_response = require('../../base_controller');

exports.index = function(req, res, next) {
    database.coworking.find(function(err, result){
        if(err){
            res.json(base_response.error('Not have information.'));
        }
        res.json(base_response.success(result));
    });
};

exports.store = function(req, res, next) {
    list_cowork_form = req.body;
    list_cowork = {};

    list_cowork.name = list_cowork_form.name;
    list_cowork.details = list_cowork_form.details;
    list_cowork.rarting = list_cowork_form.rarting;
    list_cowork.price_per_hour = list_cowork_form.price_per_hour;
    list_cowork.address = list_cowork_form.address;
    list_cowork.gellery = list_cowork_form.gellery;
    list_cowork.latitude = list_cowork_form.latitude;
    list_cowork.longitude = list_cowork_form.longitude;
    list_cowork.status = false;
    list_cowork.approve = false;
    list_cowork.provider_id = list_cowork_form.provider_id;

    if (
        !list_cowork.name
        || !list_cowork.details
        || !list_cowork.rarting
        || !list_cowork.price_per_hour
        || !list_cowork.address
        || !list_cowork.gellery
        || !list_cowork.latitude
        || !list_cowork.longitude
        || !list_cowork.provider_id
    ){
        return res.json(base_response.error('Detail not complete!!'));
    }

    database.coworking.save(list_cowork, function (err, result) {
        if (err) {
            return res.json(base_response.error('Can not save cowoking'));
        }
        return res.json(base_response.success(result));
    });
};