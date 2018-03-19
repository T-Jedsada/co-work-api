require('dotenv').config();
var mongojs = require('mongojs');
var database = mongojs(process.env.CONFIG_DATABASE);
var base_response = require('../../base_controller');

exports.index = function(req, res, next) {
    database.coworking.find({},{_id:1 , gellery :1 , name:1 ,rarting:1 ,address :1 , status:1},function(err, result){
        if(result[0]==null){
           return res.json(base_response.error('Not have information.'));
        }
        return res.json(base_response.success(result));
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
    list_cowork.gallery = list_cowork_form.gallery;
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
        || !list_cowork.gallery
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