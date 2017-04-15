var request = require('request');

exports.getHours = (solarSystemId, date, callback) => {
    var url = 'http://localhost:9000/solarSystems/' + solarSystemId;
    var queryParams = {
        date : date
    }
    request({
            url: url,
            qs:queryParams,
            json:{}
        }, (error, response) => {
            if (error) {
                console.log('get request returned error',error);
                callback(error);
                return;
            }
            if (response.statusCode === 200 && response.body !== undefined) {
                callback(error, response.body);
            }
            else {
                callback({statusCode: response.statusCode, message: response.body});
            }
    });
}

exports.getsolarSystemsInfo = (callback) => {
    var url = 'http://localhost:9000/solarSystems';
    request({
            url: url,
            json:{}
        }, (error, response) => {
            if (error) {
                console.log('get request returned error',error);
                callback(error);
                return;
            }
            if (response.statusCode === 200 && response.body !== undefined) {
                callback(error, response.body);
            }
            else {
                callback({statusCode: response.statusCode, message: response.body});
            }
    });
}