var mailer = require("nodemailer");
var _ = require('lodash');


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MailAddress,
        pass: process.env.MailPass
    }
});


exports.send = (to, data) => {
    var from = 'Nirupama Patel';
    var subject = 'Alert: Solar DC power was less than 80% of reference DC power data.';
    var hours = '';
    _.each(data,function(time) {
        hours = hours + time + '<br>';
    });
    var body = `your solar DC power was less than 80% of reference/estimated DC power data for<br>${hours}`;
    var mail = generateMail(from, to, subject, body);

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response);
        }
        smtpTransport.close();
    });
};

var generateMail = (mailFrom, mailTo, sub, mailText) => {
    var mail = {
        from: mailFrom,
        to: mailTo,
        subject: sub,
        text: mailText,
        html: mailText
    };
    return mail;
}