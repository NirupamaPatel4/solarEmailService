var express = require('express');
var bodyParser = require('body-parser');
var cronJob = require('./cronJob');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
cronJob.init();

app.listen(9001);
console.log("Listening on port 9001");

module.exports = app;
