var express = require('express');
// var subdomain = require('express-subdomain');
//
// var api = require('./api/api.js');
// var cdn = require('./cdn/cdn.js');

var ocr = require('./ocr/ocr.js');
var timer = require('./timer/timer.js');


////////////////
/// Main App ///
////////////////

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(subdomain('api', api));
// app.use(subdomain('cdn', cdn));
app.use('/ocr', ocr);
app.use('/timer', timer.router);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/sensor', function(req, res){
    res.sendFile(__dirname + '/sensor/sensor.html');
});

app.get('/weather', function(req, res){
    res.sendFile(__dirname + '/weather/weather.html');
});

app.get('/tank', function(req, res){
    res.sendFile(__dirname + '/tank/tank.html');
});

http.listen(8001, function(){
    console.log("Listening on port 8001");
});

timer.start(io);
