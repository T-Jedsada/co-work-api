var multer = require('multer');
var base_response = require('../baseController');
var image_profile = "public/uploads/images/profile";

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, image_profile);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

/* upload and save image name */
exports.upload = function(req, res, next) {
    var upload = multer({ storage: storage }).single('image');
    upload(req, res, function(err) {
        if (err) {
            res.json(base_response.error('this error '));
        }
        if(req.file === undefined){
            res.json(base_response.error('Error: No File Selected!'))
        }
        if(!req.file.mimetype.startsWith('image')){
            res.json(base_response.error('Error: No File Images!'));
        }
        res.json(base_response.success('File uploaded sucessfully!'));
    });
};