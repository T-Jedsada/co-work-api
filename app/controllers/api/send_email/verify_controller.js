require('dotenv').config();
var api_key = process.env.API_KEY_SEND_EMAIL;
var domain = process.env.DOMAIN_KEY_SEND_EMAIL;
var from_email = process.env.USERS_NAME_SEND_EMAIL;
var localhost = process.env.HOST_LOCALHOST;

module.exports = {
    verifies: function (user) {
        var to_email = user.email;
        var user_id = user._id;
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

        var data = {
            from: from_email,
            to: to_email,
            subject: 'Hello',
            html:
            '<h2>Welco register to CO-Work</h2>'+
            '<p>click ' +
                '<a href="https://api-co-work.herokuapp.com/confirm-singup/'+ user_id +'">' +
                    '<h3>Click sing-up</h3>' +
                '</a>' +
                '<p>To confirm your register</p>'+
            '</p>'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
};