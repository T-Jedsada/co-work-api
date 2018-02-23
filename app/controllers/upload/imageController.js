var multer = require('multer');
var image_profile = "public/upload/images/profile";

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, image_profile);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

/* get image name */
exports.index = function(req, res, next) {

};

/* upload and save image name */
exports.upload = function(req, res, next) {
    var upload = multer({ storage: storage }).single('image');
    upload(req, res, function(err) {
        if (err) {
            res.json({
                success : false,
                "massage": "Something went wrong!"
            });
        }

        if(req.file === undefined){
            res.json({
                success : false,
                "massage": "Error: No File Selected!"
            });
        }

        res.json({
            success : true,
            "massage": "File uploaded sucessfully!"
        });
    });
};