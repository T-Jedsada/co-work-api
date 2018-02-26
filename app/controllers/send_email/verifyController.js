require('dotenv').config();
var nodemailer = require('nodemailer');

module.exports = {
    verifies: function(user) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SEND_TO_USERS_NAME,
                pass: process.env.EMAIL_SEND_TO_USERS_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_SEND_TO_USERS_NAME,
            to: user.email,
            subject: 'Sending Email using Node.js',
            html:
            '<h2>Welcome register to CO-Work</h2>'+
            '<p>Click <a href="http://localhost:8000/api/register/verify/' + user._id + '">here</a> to confirm register</p>'+
            '<p>Or click <a href="http://localhost:8000/api/register/verify/' + user._id + '"><h3>http://localhost:8000/api/register/verify/' + user._id + '</h3></a></p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return 0;
            } else {
                return 1;
            }
        });
    }
};