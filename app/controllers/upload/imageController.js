
var image_profile = "public/upload/images/profile";

/* get image name */
exports.index = function(req, res, next) {

};

/* upload and save image name */
exports.upload = function(req, res, next) {
    if (!req.files){
        res.status(400);
        res.json({
            "success": false,
            "massage": "No files were uploaded."
        });
    }

};