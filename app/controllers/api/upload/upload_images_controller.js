require('dotenv').config();
var multer = require('multer');
var multerS3 = require('multer-s3');
var base_response = require('../../base_controller');
var aws = require('aws-sdk');
var file_name;
var file_type;

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ATCCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});

/* upload and save image name */
exports.upload = function (req, res, next) {
    var storage = multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET,
        key: function (req, file, cb) {
            file_type = file.mimetype;
            file_name = Date.now() + file.originalname;
            cb(null, file_name);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE
    });

    var upload = multer({storage: storage}).array('image', 1);
    upload(req, res, function (err) {
        if (err) {
            return res.json(base_response.error('Have something wrong!'));
        }
        /*if (file_type !== "image/jpg" && file_type !== "image/jpeg" && file_type !== "image/png" && file_type !== "image/gif") {
            return res.json(base_response.error('This not image!'))
        }*/
        return res.json(base_response.success(process.env.AWS_3S_AMAZONAWS + '/' + process.env.AWS_BUCKET + '/' + file_name));
    });
};


