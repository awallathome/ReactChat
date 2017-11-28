// Dependeincies
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var ioConnect = require("./config/io")(http);
// var connection = require("./config/connection");
// var messageJS = require("./models/message.js");
var bodyParser = require("body-parser");
// var orm = require("./config/orm");
// var routes = require("./controllers/controller.js");

// Port
var port = process.env.PORT || 3000;
console.log("Now running on port " + port + ".");

// Set body-parser middleware to handle forms and json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public directory as default location for static content
app.use(express.static("public"));

// Socket.io functions
ioConnect.on("connection", function(socket) {
  // Log connection
  console.log("User connected.");
  // Get all messages from database upon connecting
  socket.on("messages", function(messages) {
    ioConnect.emit("messages", messages);
  });

  // If user sends a message
  socket.on("message", function(message) {
    ioConnect.emit("message", message);
    // messageJS.create(message, function(response) {
    //   console.log("User sent a message.");
    // });
  });

  // If user disconnects
  socket.on("disconnect", function() {
    console.log("User disconnected.");
  });
});

// On every route, use the routes middleware
// app.use("/", routes);

// Listener
http.listen(port);
