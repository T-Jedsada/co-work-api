
/* render to view */
exports.index = function(req, res, next) {
    res.render('confirm_email/confirm_email', {mode: 'user'});
};