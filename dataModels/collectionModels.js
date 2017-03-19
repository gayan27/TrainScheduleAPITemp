/**
 * Created by Gayan Sampath on 3/4/2017.
 * @email gssampath.27@gmail.com
 */

var utills = require('../utills');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * create a collection structure for a newly sent train data
 */
var train =new Schema({
    ID        :{type:String, required:true,unique:true,max:4},
    D_NTC     :{type:String, required:true,max:6},
    RouteNo   :{type:String, required:true,max:5},
    TrainType :String
});
var Trains = mongoose.model('Trains',train);
exports.Trains = Trains;


/**
 * create  the collection structure for newly send Driver
 */
var driver = new Schema({
    NIC       :{type:String, required:true,unique:true,max:10},
    NTC       :{type:String, required:true,unique:true,max:6},
    Name      :{
        fName:String,
        lName:String
    },
    DOB       :String,
    Tel_No    :String,
    Add       :String
});
exports.Drivers = mongoose.model('Drivers',driver);



/**
 * create  the collection structure for newly sent schedule
 */
var place = new Schema({
    Place       :String,
    ArrivalTime : String
});

var Schedule = new Schema({
    TrainId         :{type:String, required:true,max:6},
    TrainName       :{type:String, required:true},
    TrainType       :{type:String, required:true},
    RouteNo         :{type:String, required:true},
    StartLocation   :{
        Place    :String,
        StartTime:String
    },
    StopLocation    :{
        Place    :String,
        StopTime :String
    },
    StopPoints  :[place]
});
exports.TrainSchedules= mongoose.model('TrainSchedules',Schedule);



/**
 * create a schema to enter a Root
 */
var geoData = new Schema({
    Place      : {type:String,require:true},
    Latitude   : {type:Number,require:true},
    Longitude  : {type:Number,require:true}
});

var route = new Schema({
    RouteNo: {type: String, require: true, unique: true,max:5},
    Description: String,
    StopPoints: [geoData]
});

exports.TrainRoutes = mongoose.model('TrainRoutes',route);
//=============================================


