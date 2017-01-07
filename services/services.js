/**
* Services.js - Service for API
* @author Gayan Sampath
**/

//var fs = require('fs');
var path = require('path');
var trainlist = require('../res/TrainSchedule.json');


/*
*This function is resfonible for all the URL base sevicess.
*/
module.exports.serviceCall = function (app) {
    
    
    // *This get method responsible for displaying Homepage
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../res/', 'index.html'));

    });
    
    
    // *This get method will retreve all the TrainScheduledata
    app.get('/stations/all', function (req, res) {
        return res.json({ Error: false, Schedule: trainlist });
    });
    
    
    /*
        // *add a data to schedule use this post method
        app.post('/stations/add', function (req, res) {
            if (!req.body.b_id) {
                return res.json({ Message: "trainID ID Missing", Error: true });
            }
            trainlist.push(req.body);
            return res.json({.
                Message: 'success',
                Error: false
            });
        });
    
    
        // *To Updata a schedule data this put method  use
        app.put('/stations/usdate/:id', function (req, res) {
            for (i = 0; i < busList.length; i++) {
                if (toString(buslist[i].t_id) === toString(req.params.t_id)) {
                    trainlist[i].t_name = req.body.t_name;
                    trainlist[i].t_type = req.body.t_type;
                    trainlist[i].s_location = req.body.s_location;
                    trainlist[i].s_time = req.body.s_time;
                    trainlist[i].desti = req.body.desti;
                    trainlist[i].arr_time = req.body.arr_time;
                    trainlist[i].sp1 = req.body.sp1;
                    trainlist[i].sp1t = req.body.sp1t;
                    trainlist[i].sp2 = req.body.sp2;
                    trainlist[i].sp2t = req.body.sp2t;
                    trainlist[i].sp3 = req.body.sp3;
                    trainlist[i].sp3t = req.body.sp3t;
                    trainlist[i].sp4 = req.body.sp4;
                    trainlist[i].sp4t = req.body.sp4t;
                    trainlist[i].sp5 = req.body.sp5;
                    trainlist[i].sp5t = req.body.sp5t;
                    trainlist[i].sp6 = req.body.sp6;
                    trainlist[i].sp6t = req.body.sp6t;
                    trainlist[i].sp7 = req.body.sp7;
                    trainlist[i].sp7t = req.body.sp7t;
                    trainlist[i].sp8 = req.body.sp8;
                    trainlist[i].sp8t = req.body.sp8t;
                    trainlist[i].sp9 = req.body.sp9;
                    trainlist[i].sp9t = req.body.sp9t;
                    trainlist[i].sp10 = req.body.sp10;
                    trainlist[i].sp10t = req.body.sp10t;
                    trainlist[i].sp11 = req.body.sp11;
                    trainlist[i].sp11t = req.body.sp11t;
                    trainlist[i].sp12 = req.body.sp12;
                    trainlist[i].sp12t = req.body.sp12t;
                    trainlist[i].sp13 = req.body.sp13;
                    trainlist[i].sp13t = req.body.sp13t;
                    trainlist[i].sp14 = req.body.sp14;
                    trainlist[i].sp14t = req.body.sp14t;
                    trainlist[i].sp15 = req.body.sp15;
                    trainlist[i].sp15t = req.body.sp15t;
                    trainlist[i].sp16 = req.body.sp16;
                    trainlist[i].sp16t = req.body.sp16t;
                    trainlist[i].sp17 = req.body.sp17;
                    trainlist[i].sp17t = req.body.sp17t;
                    trainlist[i].sp18 = req.body.sp18;
                    trainlist[i].sp18t = req.body.sp18t;
                    trainlist[i].sp19 = req.body.sp19;
                    trainlist[i].sp19t = req.body.sp19t;
                    trainlist[i].sp20 = req.body.sp20;
                    trainlist[i].sp20t = req.body.sp20t;
                    trainlist[i].sp21 = req.body.sp21;
                    trainlist[i].sp21t = req.body.sp21t;
                    trainlist[i].sp22 = req.body.sp22;
                    trainlist[i].sp22t = req.body.sp22t;
                    trainlist[i].sp23 = req.body.sp23;
                    trainlist[i].sp23t = req.body.sp23t;
                    trainlist[i].sp24 = req.body.sp24;
                    trainlist[i].sp24t = req.body.sp24t;
                    trainlist[i].sp25 = req.body.sp25;
                    trainlist[i].sp25t = req.body.sp25t;
                    trainlist[i].sp26 = req.body.sp26;
                    trainlist[i].sp26t = req.body.sp26t;
                    trainlist[i].sp27 = req.body.sp27;
                    trainlist[i].sp27t = req.body.sp27t;
                    trainlist[i].sp28 = req.body.sp28;
                    trainlist[i].sp28t = req.body.sp28t;
                    trainlist[i].sp29= req.body.sp29;
                    trainlist[i].sp29t = req.body.sp29t;
                    trainlist[i].sp30 = req.body.sp30;
                    trainlist[i].sp30t = req.body.sp30t;
                    trainlist[i].sp31 = req.body.sp31;
                    trainlist[i].sp31t = req.body.sp31t;
                    trainlist[i].sp32 = req.body.sp32;
                    trainlist[i].sp32t = req.body.sp32t; 
                    trainlist[i].sp33 = req.body.sp33;
                    trainlist[i].sp33t = req.body.sp33t;
                    trainlist[i].sp34 = req.body.sp34;
                    trainlist[i].sp34t = req.body.sp34t;
                    trainlist[i].sp35 = req.body.sp35;
                    trainlist[i].sp35t = req.body.sp35t;
                    trainlist[i].sp36 = req.body.sp36;
                    trainlist[i].sp36t = req.body.sp36t;
                    trainlist[i].sp37 = req.body.sp37;
                    trainlist[i].sp37t = req.body.sp37t;
                    trainlist[i].sp38 = req.body.sp38;
                    trainlist[i].sp38t = req.body.sp38t;
                    trainlist[i].sp39 = req.body.sp39;
                    trainlist[i].sp39t = req.body.sp39t;
                    trainlist[i].sp40 = req.body.sp40;
                    trainlist[i].sp40t = req.body.sp40t;
                    trainlist[i].sp41 = req.body.sp41;
                    trainlist[i].sp41t = req.body.sp41t;
                    trainlist[i].sp42 = req.body.sp42;
                    trainlist[i].sp42t = req.body.sp42t;
                    trainlist[i].sp43 = req.body.sp43;
                    trainlist[i].sp43t = req.body.sp43t;
                    trainlist[i].sp44 = req.body.sp44;
                    trainlist[i].sp44t = req.body.sp44t;
                    trainlist[i].sp45 = req.body.sp45;
                    trainlist[i].sp45t = req.body.sp45t;
                    trainlist[i].sp46 = req.body.sp46;
                    trainlist[i].sp46t = req.body.sp46t;
                    trainlist[i].sp47 = req.body.sp47;
                    trainlist[i].sp47t = req.body.sp47t;
                    trainlist[i].sp48 = req.body.sp48;
                    trainlist[i].sp48t = req.body.sp48t;
                    trainlist[i].sp49 = req.body.sp49;
                    trainlist[i].sp49t = req.body.sp49t;
                    trainlist[i].sp50 = req.body.sp50;
                    trainlist[i].sp50t = req.body.sp50t; 
                    trainlist[i].sp51 = req.body.sp51;
                    trainlist[i].sp51t = req.body.sp51t;
                    trainlist[i].sp52 = req.body.sp52;
                    trainlist[i].sp52t = req.body.sp52t;
                    trainlist[i].sp53 = req.body.sp53;
                    trainlist[i].sp53t = req.body.sp53t;
                    trainlist[i].sp54 = req.body.sp54;
                    trainlist[i].sp54t = req.body.sp54t;
                    trainlist[i].sp55 = req.body.sp55;
                    trainlist[i].sp55t = req.body.sp55t;
                    trainlist[i].sp56 = req.body.sp56;
                    trainlist[i].sp56t = req.body.sp56t;
                    trainlist[i].sp57 = req.body.sp57;
                    trainlist[i].sp57t = req.body.sp57t;
                    trainlist[i].sp58 = req.body.sp58;
                    trainlist[i].sp58t = req.body.sp58t;
                    trainlist[i].sp59 = req.body.sp59;
                    trainlist[i].sp59t = req.body.sp59t;
          return res.json({ message: "Success", error: false });
                }
            }
            return res.status(404).json({ message: "User not Found", error: true });
        });
    */



       // * To get a Specific train Schedule Row this get method is used
    app.get('/stations/by/id/:id', function (req, res) {
        for (i = 0; i < trainlist.length; i++) {
            var string_a = trainlist[i].TrainId.toUpperCase();
            var string_b = req.params.id.toUpperCase();
            if (string_a === string_b) {
                return res.json({
                    Error: false,
                    Message: "Success",
                    TrainList: trainlist[i]
                });
            }
        }
        return res.status(404).json({
            Error: true,
            Message: "Data not found"
        });
    });
    
    
    
    
    // *to retreve  Specific set of trains by start location
    app.get('/stations/by/startplace/:StartLocation', function (req, res) {
        var result = [];
       // console.log(req.url);
        for (i = 0; i < trainlist.length; i++) {
            var str1 = trainlist[i].StartLocation.Place.toUpperCase();
            console.log(str1);
            //str1.toUpperCase();
            var str2 = req.params.StartLocation.toUpperCase();
            //console.log(str2);
            if (str1 == str2) {
                result.push(trainlist[i]);                       //add results into json array
            }
        }
        if (result.length == 0) {                              //check whether the array is emplty
            return res.status(404).json({
                Error: true,
                Message: "Data not found"
            });
        }
        else {
            return res.json({ Error: false, Message: "Success", Content: result });
        }
    });
    
    
    //To retreve all the train list for next 10min from real time
    app.get('/stations/next/:latitude/:longitude/:time', function (req, res) {
    //app.get('/stations/next/:location/:time', function (req, res) {
        
        var suggestedList = [];
        var time = parseInt(req.params.time);
        var long = parseFloat(req.params.longitude);
        var lati = parseFloat(req.params.latitude);
        var location = req.params.location.toUpperCase();
    
        
        for (var i = 0; i < file.length; i++) {
            for (var j = 0; j < file[i].StopPoints.length; j++) {
                if (location == file[i].StopPoints[j].Place.toUpperCase()) {
                    if ((10 >= parseInt(file[i].StopPoints[j].StopTime) - time) && (0 <= parseInt(file[i].StopPoints[j].StopTime) - time)) {
                        suggestedList.push(file[i]);
                    }
                }
            }
        }
        if (suggestedList.length == 0) {
            return res.status(404).json({ "Error": false, "Message": "Data Not found" });
        } else {
            return res.status(200).json({ "Error": false, "Message": "Success", "Content": suggestedList });
        }

    });


}
