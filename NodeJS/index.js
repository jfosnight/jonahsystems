var util = require('util');
var ocr = require('./ocr/index.js');
var timer = require('./timer/index.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log("Listening for connections");
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ocr/cropper', function(req, res){
  res.sendFile(__dirname + "/cropper.html");
});

app.get('/ocr', function(req, res){
  res.sendFile(__dirname + '/ocr/index.html');
});

app.post('/ocr', ocr.processRequest);

app.get('/timer', function(req, res){
  res.sendFile(__dirname + '/timer/index.html');
});

app.get('/:type/:filename', function(req, res){
  res.sendFile(__dirname + '/' + req.params.type + '/' + req.params.filename);
});

timer.start(io);
