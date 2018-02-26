var multer = require('multer');
var image_profile = "public/uploads/images/profile";
var base_response = require('../baseController');
//var image_multer_controller = require('./multers/imageMulterController');

/* upload and save image name */
exports.upload = function(req, res, next) {
    var upload = multer({
        storage: storage,
        fileFilter: file_filter,
        limits:{
            fileSize: 1024 * 1024
        }
    }).single('image');
    upload(req, res, function(err) {
        if (err) {
            res.json(base_response.error('Error: Have something wrong!'));
        }
        if(req.file === undefined){
            res.json(base_response.error('Error: No file selected!'))
        }
        if(!req.file.mimetype.startsWith('image')){
            res.json(base_response.error('Error: Don,t file images!'));
        }
        res.json(base_response.success('File uploaded sucessfully!'));
      });
};

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, image_profile);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var file_filter = function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
};
