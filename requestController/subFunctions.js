/**
 * Created by Gayan Sampath on 3/6/2017.
 */
var utills = require('../utills');
var collectionModels = require('../dataModels/collectionModels');


/**
 *
 * This method will return all the trainRoute numbers matches with start locaton and end location
 *
 * @param sLoc     : start location
 * @param eLoc     : end location
 * @param callBack : return the route number list
 */


function getRoute(sLoc, eLoc,callBack){
    var list =[];
    console.log(sLoc);  // to be removed
    console.log(eLoc);  // to be removed
    var sLocation =sLoc;
    var eLocation =eLoc;
    utills.logger("successfully accessed getRoute", 200);
    utills.DBConnection();
    collectionModels.TrainRoutes.find(function (err,data) {
        if(err){
            utills.logger("Error occur",500,err);
        } else{

            for(var i=0;i<data.length;i++){
                var j=0;
                var k=0;
                for(var j=0;j<data[i].StopPoints.length;j++){
                    var temp1 = false;
                    var temp2 = false;
                    var sL = (data[i].StopPoints[j].Place);
                    console.log(sL);
                    if ((data[i].StopPoints[j].Place)  === sLocation) {
                        temp1 = true;
                        break;
                    }
                }


                for(var k=0;k<data[i].StopPoints.length;k++){
                    if ((data[i].StopPoints[k].Place) === eLocation) {
                        temp2 = true;
                        break;
                    }
                }

                if((temp1 === true && temp2 ===true) &&(j < k)){
                    list.push(data[i].RouteNo);
                }
            }
        }
        if(list.length == 0){
            utills.logger("Data not found",404,err);
            callBack(err,list);
        }else{
            utills.logger("Successfully returned route list",200);
            callBack(err,list);

        }

    });

}
exports.getRoute=getRoute;


/**
 *
 * This method will return future trains within 15 min from requested time
 *
 * @param array     :a route number list will be pased as a array
 * @param reqTime   :requested time
 * @param sLoc      :start location
 * @param callback  :callback function to return Trainlist
 */



function getFutureTrainList(array,reqTime,sLoc,callback){
    var fullArray=[];
    var result=[];
    var sLocation =sLoc;
    var count =0;
    utills.logger("successfully accessed getFutureTrainList", 200);
    utills.DBConnection();

    for(var i=0;i<array.length ;i++){
        var sellection = {
            RouteNo : array[i]
        };
        var projection = {
            _id : false,
            _v :false
        };
        collectionModels.TrainSchedules.find(sellection,projection, {}, function (err, datalist) {
            if (err) {
                utills.logger("error occured :", 500, err);
            } else {
                var items = 0;
                while (datalist.length -1 >= items){
                    fullArray.push(datalist[items]);
                    items++;
                }
                if(array.length-1 == count){
                    for(var j=0;j< fullArray.length;j++){
                        var end = fullArray[j].StopPoints.length;
                        for(var k =0;k < end;k++){
                            var nTime = parseInt(fullArray[j].StopPoints[k].ArrivalTime);
                            var timeGap = (nTime - reqTime );
                            var startPlace = (fullArray[j].StopPoints[k].Place);

                            if((timeGap <= 15 && timeGap >=0) && (startPlace === sLocation)){
                                console.log(nTime+" "+timeGap+" "+startPlace); // to be removed
                                console.log(fullArray[j].ID);                  // to be removed
                                result.push(fullArray[j]);
                            }
                        }

                    }
                    if(result.length == 0){
                        utills.logger("No item found with start time and start location",404,err);
                        callback(err,result);
                    }else{
                        utills.logger("Trainlist returned from getFutureTrainList",200);
                        callback(err,result);
                    }

                }else {
                    count++;
                }
            }
        });

    } //end of the for loop

}
exports.getFutureTrainList = getFutureTrainList;



function getPosibleTrainList(array,reqTime,sLoc,callback){
    var fullArray=[];
    var posibleList=[];
    var result=[];
    var sLocation =sLoc;
    var count =0;
    utills.logger("successfully accessed posibleTrainList", 200);
    utills.DBConnection();

    console.log("Hello"+array.length);
    for(var i=0;i<array.length ;i++){
        var sellection = {
            RouteNo : array[i]
        };
        var projection = {
            _id : false,
            __v :false
        };
        collectionModels.TrainSchedules.find(sellection,projection, {}, function (err, datalist) {
            if (err) {
                utills.logger("error occured :", 500, err);
            } else {
                var items = 0;
                while (datalist.length -1 >= items){
                    fullArray.push(datalist[items]);
                    items++;
                }
                if(array.length-1 == count){
                    for(var j=0;j< fullArray.length;j++){
                        var end = fullArray[j].StopPoints.length;
                        for(var k =0;k < end;k++){
                            var nTime = parseInt(fullArray[j].StopPoints[k].ArrivalTime);
                            var timeGap = (nTime - reqTime );
                            var startPlace = (fullArray[j].StopPoints[k].Place);

                            if((timeGap <= 15 && timeGap >=0) && (startPlace === sLocation)){
                                //console.log(nTime+" "+timeGap+" "+startPlace); // to be removed
                                //console.log(fullArray[j].ID);                  // to be removed
                                //result.push(fullArray[j]);
                                var TrainId =fullArray[j].TrainId;
                                var TrainName =fullArray[j].TrainName;
                                var TrainType =fullArray[j].TrainType;
                                var RouteNo =fullArray[j].RouteNo;
                                var StartL=fullArray[j].StopPoints[0].Place;
                                var StartT=fullArray[j].StopPoints[0].ArrivalTime;
                                var EndL=fullArray[j].StopPoints[end -1].Place;
                                var EndT=fullArray[j].StopPoints[end-1].ArrivalTime;
                                posibleList.push({TrainId:TrainId,TrainName:TrainName,TrainType:TrainType,RouteNo:RouteNo,StartLocation:StartL,StartTime:StartT,EndLocation:EndL,EndTime:EndT});
                            }
                        }

                    }
                    if(posibleList.length == 0){
                        utills.logger("No item found with start time and start location",404,err);
                        callback(err,posibleList);
                    }else{
                        utills.logger("Trainlist returned from getFutureTrainList",200);
                        callback(err,posibleList);
                    }

                }else {
                    count++;
                }
            }
        });

    } //end of the for loop

}
exports.getPosibleTrainList = getPosibleTrainList;






