/**
 * Created by Gayan Sampath on 3/4/2017.
 */

var utills = require('../utills');
var subFunctions = require('./subFunctions');
var path = require('path');
var collectionModels = require('../dataModels/collectionModels');

/**
 * all the get request from the user, is handled here
 * @param app
 */
module.exports.getMethods = function (app) {
    utills.logger(__dirname + "\\getRequest.js", 200);

    /**
     * send a index file of the train api
     */
    app.get('/', function (req, res) {
        utills.logger("successfully accessed " + req.url, 200);
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
        res.status(200);
        utills.logger("successfully send the index.html file", 200);
    });


//===================================================================================================
    /**
     * send all train ids in json format, listed in the database
     */
    app.get('/get/all-train', function (req, res) {
        utills.logger("successfully accessed " + req.url, 200);
        utills.DBConnection();
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Trains.find({}, Projection, function (err, train_id) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: train_id});
                utills.logger("successfully send the train id list", 200);
            }
        });

    });

    /**
     * send all drivers listed in the database
     */
    app.get('/get/all-driver', function (req, res) {
        utills.logger("successfully accessed " + req.url, 200);
        utills.DBConnection();
        var Projection = {
            _id: false,
            __v: false

        };
        collectionModels.Drivers.find({}, Projection, function (err, list) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: list});
                utills.logger("successfully send the Driver list", 200);
            }
        });
    });


//==========================================================================================


    /**
     * send specific train data by given train ID
     */
    app.get('/get/train/:id', function (req, res) {
        utills.logger("successfully accessed " + req.url, 200);
        utills.DBConnection();
        var Selection = {
            ID: req.params.id
        };
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Trains.find(Selection, Projection, function (err, train) {
            if (err) {
                utills.logger("error occured :", 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: train});
                utills.logger("successfully send the Train", 200);
            }
        });
    });


    /**
     * send a specific driver data by given driver NTC
     */
    app.get('/get/driver/:ntc', function (req, res) {
        utills.logger('successfully accessed ' + req.url, 200);
        utills.DBConnection();
        var Selection = {
            NTC: req.params.ntc
        };
        var Projection = {
            __v: false,
            _id: false
        };
        collectionModels.Drivers.find(Selection, Projection, function (err, driver) {
            if (err) {
                utills.logger('error occured :', 500, err);
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({status: 'Error', content: err.name});
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({status: 'success', content: driver});
                utills.logger("successfully send the Driver ", 200);
            }
        });

    });


    //===========================================================================


    /**
     * this method will return scheduled trains after the requested time
     */
    app.get('/get/fschedule/:startLocation/:endLocation/:sTime',function (req,res) {
        var sLocation =   req.params.startLocation;
        var eLocation = req.params.endLocation;
        var sTime      = parseInt(req.params.sTime);

        subFunctions.getRoute(sLocation ,eLocation,function (err,routeList) {
            var routes = routeList;
            if(err){
                utills.logger("Error happen :",500,err);
            }else {
                subFunctions.getFutureTrainList(routes,sTime,sLocation,function (err,list ){
                    if(err){
                        utills.logger("Error happen :",500,err);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).send({status: 'Error', content: ""});
                    }else{
                        console.log(list);
                      res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'success', content: list});
                        utills.logger("successfully send the array list ", 200);

                    }

                });
            }
        });

    });



    /**
     * this method will return posible Train List
     */
    /**
     * this method will return scheduled trains after the requested time
     */
    app.get('/get/pschedule/:startLocation/:endLocation/:sTime',function (req,res) {
        var sLocation =   req.params.startLocation;
        var eLocation = req.params.endLocation;
        var sTime      = parseInt(req.params.sTime);

        subFunctions.getRoute(sLocation ,eLocation,function (err,routeList) {
            var routes = routeList;
            if(err){
                utills.logger("Error happen :",500,err);
            }else {
                //console.log(routes);  //remove after compleation
                subFunctions.getPosibleTrainList(routes,sTime,sLocation,function (err,list ){
                    if(err){
                        utills.logger("Error happen :",500,err);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'Error', content: ""});
                    }else{
                        console.log(list);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send({status: 'success', content: list});
                        utills.logger("successfully send the array list ", 200);

                    }

                });
            }
        });

    });




};
