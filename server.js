// Dependeincies
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var ioConnect = require("./config/io")(http);
var Message = require("./config/message.js");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Room = require("./config/room");

// Port
var port = process.env.PORT || 3001;
console.log("Now running on port " + port + ".");

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/confyddb",
  {
    useMongoClient: true
  }
);

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

  });

  // If user disconnects
  socket.on("disconnect", function() {
    console.log("User disconnected.");
  });
});

  //routes
  app.get("/api/room", function (req, res) {
    Room.create({})
      .then(function(dbRoom) {
        res.json(dbRoom);
      })
  });

  app.get("/api/room/:id", function(req, res) {
    Room.find({ _id: req.params.id})
      .then(function(dbRoom) {
        res.json(dbRoom);
      })
      .catch(function(err) {
        res.status(422).json(err);
      })
  });

  app.get("/api/messages", function(req, res) {
    Message.find(req.query)
      .then(function(dbMessages) {
        res.json(dbMessages);
      })
  })

// Listener
http.listen(port);
