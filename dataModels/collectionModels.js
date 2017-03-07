/**
 * Created by Gayan Sampath on 3/4/2017.
 * @email gssampath.27@gmail.com
 */

var utills = require('../utills');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * create a collection structure for a newly sent train
 */
var train =new Schema({
    ID        :{type:String, required:true,unique:true},
    D_NTC     :{type:String, required:true},
    RouteNo   :{type:String, required:true},
    TrainType   :String
});
var Trains = mongoose.model('Trains',train);
exports.Trains = Trains;


/**
 * create  the collection structure for newly send Driver
 */
var driver = new Schema({
    NIC       :{type:String, required:true,unique:true},
    NTC       :{type:String, required:true,unique:true},
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
 * create a schema to enter a Root
 */
var geoData = new Schema({
    place      :{type:String,require:true},
    latitude   : {type:Number,require:true},
    longitude  : {type:Number,require:true}
});

var route = new Schema({
    RouteNo: {type: String, require: true, unique: true},
    Description: String,
    StopPoints: [geoData]
});

exports.TrainRoutes = mongoose.model('TrainRoutes',route);
//=============================================


