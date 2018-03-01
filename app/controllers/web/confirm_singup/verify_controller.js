require('dotenv').config();
var mongojs = require('mongojs');
var database = mongojs(process.env.CONFIG_DATABASE,[process.env.DB_TABLE_USERS]);

/* Update status register*/
exports.verify = function(req, res, next) {
    database.users.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { status: true } }, function(err, user){
        if(err){
            return res.send('Can not confirm sing up. Have something wrong');
        }
        return res.render('confirm_email/verify_success');
    });
};