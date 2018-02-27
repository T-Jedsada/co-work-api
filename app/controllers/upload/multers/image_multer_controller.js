var multer = require('multer');
var image_profile = "public/uploads/images/profile";


module.exports = {
    storages: function (data) {
        multer.diskStorage({
            destination: function(req, file, callback) {
                callback(null, image_profile);
            },
            filename: function(req, file, callback) {
                callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
            }
        });
        return storage;
    }
};