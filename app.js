
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var services = require('./services/services.js');
var config = require('./config.json'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//To access TrainSchedule.json  file directly 
app.use("/DataFiles", express.static(__dirname + '/res/TrainSchedule.json')); 
services.serviceCall(app);

//starting the server
app.listen(config.SERVER_PORT, function (res, err) {
    if (err) {
        console.log('Somthing going wrong Please Check The Error :' + err);
        res.status(500);
    }
    console.log('TrainSchedule is listening on port ' + config.SERVER_PORT);
})
