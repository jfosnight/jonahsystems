var api = require("./api");
var express = require('express');

var app = express();
var http = require('http').Server(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', api);


http.listen(8002, function(){
    console.log("Listening on port 8002");
});
