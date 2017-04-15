var cron = require('cron');
var solarService = require('./solarService');
var emailService = require('./emailService');
var _ = require('lodash');

exports.init = () => {
    var cronJob = cron.job("00 00 20 * * *", function(){
        //get liveSolarSystemsInfo
        solarService.getsolarSystemsInfo((err,data) => {
            if (err) {
                console.log('could not fetch data');
                console.log('cron job completed');
            }
            else {
                var date = getDate();
                // get hours for each solarSystem
                _.each(data,function(d) {
                    solarService.getHours(d.solarsystemid, date, (err, res) => {
                        if (err) {
                            console.log('could not fetch data');
                            console.log('cron job completed');
                        }
                        else {
                            // call EmailService to send an alert.
                            emailService.send(d.email, res);
                            console.log('cron job completed');
                        }
                    });
                });
            }
        });


    });
    cronJob.start();
};

var getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'-'+mm+'-'+yyyy;
    return today;
}
