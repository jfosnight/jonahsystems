var express = require('express');

///////////////////
///// Static //////
///////////////////

var staticRoute = express.Router();
staticRoute.get('/', function(req, res){
    res.send("Landing Page for Static Files");
});

staticRoute.get('/:type/:filename', function(req, res){
  res.sendFile('/home/jfosnight/static' + '/' + req.params.type + '/' + req.params.filename);
});

staticRoute.get('/*', function(req, res){
    res.send("Landing Page for Static Files");
});

module.exports = staticRoute;
