JonahSystems
============

JonahSystems (Jonny's Online Networked Automated Home Systems)  is the basis of my home automation project that I have worked on for the last couple years as a school project.

I will be working on getting code uploaded as I go through and comment/clean up everything and remove all the sensitive parts such as Google API keys.  I just wanted to get this initial page written so I could upload a couple scripts that I just figured out/wrote/spent 5 hours trying to decipher.

At the very heart of the system is a Raspberry Pi with just the default Raspbian Linux Distro loaded on it.

For the lights I have for now choosen to use X10 as it was the most economical option.  I am using a USB X10 wireless tranmitter to communicate with the other X10 Modules.  The X10 Tranciever is plugged into the Raspberry Pi and I am using a Python module that I found elsewhere online and have modified for my purposes.  For now this only provides outgoing transmissions and cannot recieve signals from the X10 remotes and other devices.  I will put proper acknowledgement in the X10 Script.

Another part of my project was building a web page to allow me to control my lights from anywhere in the world.  With it's current implementation I am using a Python Module called Bottle (http://bottlepy.org) to act as my webserver and process all the commands.  Because I am using python as the server, it allows me to place Python commands directly inside the HTML template, much like you would use PHP inside of and HTML file.

My current implementation of the Bottle server does not have authentication or identification so I would not recommend using it as is as it opens your lights up to the world to play with.

Yet another thing that I implemented in this project was an Alarm Clock feature.  Originally the plan was for it to give a weather report and then play music.  Alternating between the two every 5 minutes or so.  It would also turn the lights on one at a time.  Oh yeah, one of the best features of this, is that it will actually querry my Google calendar everyday to find out when it needs to wake me up.  However I didn't like the weather report very much and never rememebered it anyways, so I have opted to go for a graphical approach for that.

Which brings me to the next part.  Sure I could get the weather from any place on the internet, but I chose instead to try building my own weather station instead and use external sources only for forecast and other difficult to gather things, such as cloudiness.



