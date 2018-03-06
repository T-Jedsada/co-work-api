require('dotenv').config();
var base_response = require('../../base_controller');
var api_key = process.env.API_KEY_SEND_EMAIL;
var domain = process.env.DOMAIN_KEY_SEND_EMAIL;
var from_email = process.env.USERS_NAME_SEND_EMAIL;
var host = process.env.HOST_DOMAIN;

/*send email */
exports.index = function(req, res, next) {
    var user = req.body;
    var user_id = user.id;
    var to_email = user.email;

    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
        from: from_email,
        to: to_email,
        subject: 'Hello',
        html:
        '<h2>Welco register to CO-Work</h2>'+
            '<p>click ' +
            '<a href="'+ host +'/change-password/'+ user_id +'">' +
                '<h3>Click sing-up</h3>' +
            '</a>' +
            '<p>To confirm your register</p>'+
        '</p>'
    };

    mailgun.messages().send(data, function (error, user) {
        console.log(user);
    });
    return res.json(base_response.success('Send email success'))
};