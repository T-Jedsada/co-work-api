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
            '<form action="http://localhost:8000/api/register/verify/' + user._id + '" method="post">' +
                '<input type="hidden" name="name" value="Jarter">'+
                '<button type="submit">confirm register</button>'+
            '</form>'+
            /*'<p>Click <a href="http://localhost:8000/api/register/verify/' + user._id + '">here</a> to confirm register</p>'+*/
            '<p>Or click <a href="http://localhost:8000/api/register/verify/' + user._id + '"><h3>http://localhost:8000/api/register/verify/' + user._id + '</h3></a></p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return 0;
            } else {
                return 1;
            }
        });
    },
    verified: function (user) {
        var api_key = 'key-5bd6880d8dc86d171ed0ff5d41ca9324';
        var domain = 'sandboxdbeede01771b418fb0f261064025c4e8.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

        var data = {
            from: 'Mail Gun <postmaster@co-work.20scoops.com>',
            to: user.email,
            subject: 'Hello',
            html:
            '<h2>Welco register to CO-Work</h2>'+
            '<p>click <a href="http://localhost:8000/confirm-singup"><h3>http://localhost:8000/sing-up</h3></a></p>'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
};