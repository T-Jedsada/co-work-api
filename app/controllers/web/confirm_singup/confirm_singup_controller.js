var mongojs = require('mongojs');

/* render to view */
exports.index = function(req, res, next) {
    var id = mongojs.ObjectId(req.params.id);
    res.render('confirm_email/confirm_email', {'id': id});
};