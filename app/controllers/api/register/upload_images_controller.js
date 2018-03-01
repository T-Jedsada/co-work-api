require('dotenv').config();
var multer = require('multer');
var multer_s3 = require('multer-s3');
var base_response = require('../../base_controller');
var aws = require('aws-sdk');
var file_name;

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ATCCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});
var s3 = new aws.S3();
var storage = multer_s3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    key: function (req, file, cb) {
        console.log(file);
        file_name = file.originalname;
        cb(null, file.originalname);
    }
});

/* upload and save image name */
module.exports = {
    upload: function(req, res) {
        var upload = multer({storage: storage}).array('image', 1);
        upload(req, res, function (err) {
            if (err) {
                res.json(base_response.error('Error: Have something wrong!'));
            }
        });
        return process.env.AWS_3S_AMAZONAWS + '/' + process.env.AWS_BUCKET + '/' + file_name;
    }
};

