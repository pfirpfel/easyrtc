// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);

easyrtc.on("getIceConfig", function(connectionObj, callback){
  var myIceServers=[
    {"url":"stun:stun.easyrtc.com:3478"},
    {
      "url":        "turn:lvps176-28-19-44.dedicated.hosteurope.de:3478",
      "username":   "turnuser",
      "credential": "someComplicatedPasswordW1thNumb3r5"
    },
    {
      "url":        "turn:numb.viagenie.ca:3478",
      "username":   "michael.kuenzli@fhnw.ch",
      "credential": "someComplicatedPasswordW1thNumb3r5"
    }
  ];

  callback(null, myIceServers);
});
