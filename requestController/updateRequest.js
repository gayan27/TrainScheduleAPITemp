/**
 * Created by Gayan Sampath on 3/4/2017.
 */

var utills = require('../utills');
var collectionModel = require('../dataModels/collectionModels');


module.exports.updateMethods = function (app) {
    utills.logger(__dirname + "\\updateRequest.js", 200);


    /**
     * to update a train by its ID
     */
    app.post('/update/train/:trainId',function (req,res) {
        utills.logger('successfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            ID :req.params.trainId
        };
        var update ={
            ID        :req.body.ID,
            D_NTC     :req.body.D_NTC,
            RouteNo   :req.body.RouteNo,
            TrainType :req.body.TrainType
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.Trains.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,err,list);
            }
        });
    });



    /**
     * to update a Driver by his NTC
     */
    app.post('/update/driver/:ntc',function (req,res) {
        utills.logger('successfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            NTC :req.params.ntc
        };
        var update ={
            NIC: req.body.NIC,
            NTC: req.body.NTC,
            Name: {
                fName: req.body.fName,
                lName: req.body.lName
            },
            DOB: req.body.DOB,
            Tel_No: req.body.Tel_No,
            Add: req.body.Add
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.Drivers.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(200,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,'',list);
            }
        });
    });


    /**
     * to update a Route by Its Route number
     */
    app.post('/update/route/:routes',function (req,res) {
        utills.logger('sucessfully accessed ' + req.url, 200);
        utills.DBConnection();
        var selection={
            RouteNo:req.params.routes
        };
        var update ={
            RouteNo:req.body.RouteNo,
            Descriptions:req.body.Description,
            StopPoints: req.body.StopPoints
        };

        var options = {
            new:true,
            projection:{_id: false,__v:false},
            maxTimeMS: 300
        };

        collectionModel.TrainRoutes.findOneAndUpdate(selection,update,options,function (err,list) {
            if(err){
                utills.logger("Document is not saved", 500, err);
                utills.sendResponce(500,res,err);
            }else {
                utills.logger('Document is saved successfully', 200);
                utills.sendResponce(200,res,'',list);
            }
        });
    });



};

