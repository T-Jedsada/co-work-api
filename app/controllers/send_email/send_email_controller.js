require('dotenv').config();
var base_response = require('../base_controller');
var nodemailer = require('nodemailer');

/*send email */
exports.index = function(req, res, next) {
    var send = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SEND_TO_USERS_NAME,
            pass: process.env.EMAIL_SEND_TO_USERS_PASSWORD
        }
    });

    var mailOptions = {
        from: send.email_from,
        to: send.email_to,
        subject: 'Sending Email using Node.js',
        text: '!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json(base_response.error('Error: Have something wrong!'))
        } else {
            res.json(base_response.success('Send email successfully'))
        }
    });
};