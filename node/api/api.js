var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

//////////////////////
//////   API  ////////
//////////////////////

// Setup DB Connections
var mongoUrl = 'mongodb://localhost:27017/jonah';
var mongo = require('mongoskin');
var db = mongo.db(mongoUrl, {native_parser: true});
db.bind('sensors');
db.bind('sensorData');


// Setup Routes
var apiRoute = express.Router();
var jsonParser = bodyParser.json();

apiRoute.get('/', function(req, res){
    res.send("Landing Page for API");
});

apiRoute.get('/sensor', function(req, res){
    db.sensors.find().toArray(function(err, items){
        if(err) return res.send(err);
        res.json(items);
    });
});

apiRoute.get('/sensor/:id', function(req, res){
    var sensorId = Number(req.params.id);


    db.sensors.find({sensorId: sensorId}).toArray(function(err, items){
        if(err) return res.send(err);

        return res.json(items);
    });
});

apiRoute.get('/sensor/:id/data', function(req, res){
    var sensorId = Number(req.params.id);

    db.sensorData.find({sensorId:sensorId, timestamp:{ $gt: moment().subtract(1, 'day').toDate() } }).toArray(function(err, items){
        if(err) return res.send(err);

        return res.json(items);
    });
});

apiRoute.get('/sensor/:id/data-compact', function(req, res){
    var sensorId = Number(req.params.id);

    db.sensorData.find({sensorId:sensorId, timestamp:{ $gt: moment().subtract(1, 'day').toDate() } }).toArray(function(err, items){
        if(err) return res.send(err);

        var startTime = moment().subtract(1, 'day');
        var buckets = {};
        for(var i in items){
            var item = items[i];
            var time = moment(item.timestamp);
            var date = time.format('YYYY-MM-DD');
            var hour = time.hour();
            //console.log(time.minute() + time.second() * (1/60));
            var minute = Math.round(  (time.minute() + time.second() * (1/60) ) / 5) * 5;

            if(minute === 60){
                minute = 0;
                if(hour === 23){
                    hour = 0;
                    date = moment(date).add({day: 1}).format("YYYY-MM-DD");
                } else {
                    hour += 1;
                }
            }

            if(buckets[date] && buckets[date][hour] && buckets[date][hour][minute]){
                buckets[date][hour][minute].push(item);
            } else {
                if(!buckets[date]){
                    buckets[date] = {};
                }
                if(!buckets[date][hour]){
                    buckets[date][hour] = {};
                }
                if(!buckets[date][hour][minute]){
                    buckets[date][hour][minute] = [item];
                }
            }
        }

        var finalData = [];
        for(var day in buckets){
            for(var hour in buckets[day]){
                for(var min in buckets[day][hour]){
                    var bucket = buckets[day][hour][min];
                    var count = 0;
                    var data = {};
                    for(var i in bucket){
                        var item = bucket[i];
                        count++;
                        for(var name in item){
                            if(name === "_id" || name === "sensorId" || name === "timestamp"){
                                continue;
                            }
                            if(data[name]){
                                data[name] += item[name];
                            } else {
                                data[name] = item[name];
                            }
                        }
                    }

                    for(var i in data){
                        data[i] = data[i] / count;
                    }
                    data.timestamp = moment(day).hour(hour).minute(min).toJSON();
                    finalData.push(data);
                }
            }
        }

        return res.json(finalData);
    });
});

apiRoute.post('/sensor', jsonParser, function(req, res){
    if (!req.body) return res.sendStatus(400);
    var sensorProfile = req.body;
    db.sensors.find({}, {sort:{sensorId:-1},limit:1}).toArray(function(err, items){
        if(err) return res.send(err);
        if(items.length === 0) return res.send("Unable to get sensor id.");

        sensorProfile.sensorId = items[0].sensorId + 1;
        sensorProfile.createDate = new Date();

        db.sensors.insert(sensorProfile, function(err, result){
            if(err) return res.send(err);

            return res.json(result);
        });
    });
});

apiRoute.put('/sensor/:id', jsonParser, function(req, res){
    var sensorId = Number(req.params.id);

    var sensorProfile = req.body;
    sensorProfile.updateTime = new Date();

    db.sensors.update({sensorId: sensorId}, {$set:sensorProfile}, function(err, result){
        if(err) return res.send(err);

        db.sensors.find({sensorId: sensorId}).toArray(function(err, items){
            if(err) return res.send(err);
            res.json(items);
        });
    });
});

apiRoute.post('/sensor/:id/data', jsonParser, function(req, res){
    var sensorId = Number(req.params.id);

    sensorData = req.body;
    sensorData.sensorId = sensorId;
    sensorData.timestamp = new Date();
    db.sensorData.insert(sensorData, function(err, result){
        if(err) return res.send(err);

        return res.json(result);
    });
});

apiRoute.get('/*', function(req, res){
    res.send("API Page");
});


// Export to use in other apps
module.exports = apiRoute;
