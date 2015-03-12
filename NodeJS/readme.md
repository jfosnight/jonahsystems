#Introduction
This folder contains my various experiments with Node.js  I would eventually like to combine some of the projects together to make a final product, but until that point, this will serve as a collection of all my smaller projects/ideas/experiments/tests.

##Timer
This application is a simple proof of concept for a distributed, cloud based timer.  It relies on Socket.io as the primary communication method.

Specifically it was designed for a kitchen timer, which will consist of both a physical device and a web interface.  This is the beginning of the web interface.  So far features include:
* Two Independent Timers
* Auto sync/update
* Sound and notification to indicate timer is finished
* Simple interface for starting & stopping timers
* Works well with both desktop/mobile browsers


##OCR
The OCR integration that I have done so far involves:
* Opening an image in the browser
* Cropping the section you want to process
* Uploading the file and crop specifications to the server for processing
* Preforming the actual OCR on the provided image
* Return result back in JSON format

All of the server side functions are handled with Node except for the OCR itself, which uses the [tesseract](https://code.google.com/p/tesseract-ocr/) OCR engine (developed by Google).
