/**
 * Created by Gayan Sampath on 3/4/2017.
 */
var utills = require('../utills');
var collectionModel = require('../dataModels/collectionModels');


module.exports.postMethods = function (app) {
    utills.logger(__dirname + "\\postRequest.js", 200);


    /**
     * this method will save the data came from admin, into database
     */
    app.post('/post/train', function (req, res) {
        utills.logger('successfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newTrain = new collectionModel.Trains({
            ID        :req.body.ID,
            D_NTC     :req.body.D_NTC,
            RouteNo   :req.body.RouteNo,
            TrainType :req.body.TrainType
        });
        newTrain.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(200,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });

    });


    /**
     *this method will save the driver details came from admin, into database
     */
    app.post('/post/driver', function (req, res) {
        utills.logger('successfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newDriver = collectionModel.Drivers({
            NIC       :req.body.NIC,
            NTC       :req.body.NTC,
            Name      :{
                fName:req.body.fName,
                lName:req.body.lName
            },
            DOB       :req.body.DOB,
            Tel_No    :req.body.Tel_No,
            Add       :req.body.Add
        });
        newDriver.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(200,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
    });



    /**
     * this method will add a new route to the database
     *
     * warning can't update 2 records with same TrainID... Schema problem when it creates
     *
     */


    app.post('/post/route',function(req,res){
        utills.logger("Successfully accessed url" +req.url,200);
        utills.DBConnection();
        var routeObject = req.body;
        var newRoute   = collectionModel.TrainRoutes({
            RouteNo:routeObject.RouteNo,
            Description:routeObject.Description,
            StopPoints:routeObject.StopPoints

        });
        newRoute.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(200,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
    });





    app.post('/post/schedule',function(req,res){
        utills.logger("Successfuly accesed url" +req.url,200);
        utills.DBConnection();
        var scheduleObject = req.body;    //wrong sponsorobject
        var newSchedule = collectionModel.TrainSchedules({
            TrainId         :scheduleObject.TrainId,
            TrainName      :scheduleObject.TrainName,
            TrainType      :scheduleObject.TrainType,
            RouteNo       :scheduleObject.RouteNo,
            StartLocation :{
                  Place :scheduleObject.Place,
                 StartTime:scheduleObject.StartTime
            },
            StopLocation :{
                Place :scheduleObject.Place,
                StopTime:scheduleObject.StopTime
            },
            StopPoints   :scheduleObject.StopPoints
        });
        newSchedule.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(200,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });

    });













};
