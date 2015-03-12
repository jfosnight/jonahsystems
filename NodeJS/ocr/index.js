var tesseract = require('node-tesseract');
var formidable = require('formidable');
var sharp = require('sharp');

exports.processRequest = function(req, res){
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if(files.image){
      if(files.image.size !== 0){
        console.log("Recieved File Upload");
        var file = files.image.path;

        if(fields.x !== ""){
          sharp(files.image.path)
            .extract(parseInt(fields.y), parseInt(fields.x), parseInt(fields.w), parseInt(fields.h))
            .toFile('ocr/output.jpg', function(){
              file = __dirname + "/output.jpg";
              procFile(file, function(text){
                res.writeHead(200, {'content-type': 'application/json'});
                res.write(JSON.stringify({'filename': files.image.name, 'content': text}));
                res.end();
              });
            });
        } else {
          res.send("Could not process file");
          return;
        }
      }
    } else {
      res.send("No image submitted");
    }
  });
};

function procFile(filepath, callback){
  console.log(filepath);
  var options = {
    config: __dirname + '/config.txt'
  };
  var text = tesseract.process(filepath, options, function(err, text) {
    if(err) {
      console.log(err);
      callback(text);
    } else {
      if(text === ""){
        text = "Could not find text";
      }
      console.log(text);
      callback(text);
    }

  });
}
