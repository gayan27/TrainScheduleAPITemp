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
            ID        :req.body.trainId,
            D_NTC     :req.body.driverNTC,
            RouteNo   :req.body.routeNo,
            TrainType :req.body.trainType
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
        res.end();

    });


    /**
     *this method will save the driver details came from admin, into database
     */
    app.post('/post/driver', function (req, res) {
        utills.logger('successfully accessed ' + req.url, 200);

        utills.DBConnection();
        var newDriver = collectionModel.Drivers({
            NIC       :req.body.driverNIC,
            NTC       :req.body.driverNTC,
            Name      :{
                fName:req.body.driverFname,
                lName:req.body.driverLname
            },
            DOB       :req.body.driverDOB,
            Tel_No    :req.body.driverTP,
            Add       :req.body.driverAddress
        });
        newDriver.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
        res.end();
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
            StopPoints:routeObject.StopPoints,

        });
        newRoute.save(function (err) {
            if (err) {
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            } else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res);
            }
        });
    });



};
