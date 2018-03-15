var base_response = require('../../base_controller');
var mongoose = require ("mongoose");

exports.store = function(req, res, next) {
    var uristring = process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS];
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log ('Succeeded connected to: ' + uristring);
        }
    });

    var list_cowork_form = req.body;
    var list_cowork = {};

    return res.json(base_response.success(list_cowork_form.status.name));
};