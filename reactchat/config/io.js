// This page defines the server-side listener for socket emits
var io = require("socket.io");
var messageModel = require("./message");

// Socket.io emit function
module.exports = function(http) {
  var ioConnect = io(http);
  ioConnect.on("connection", function(socket) {
    socket.on("message", function(message) {
      socket.emit("room-" + data.room + "-message", {
        message: "It worked",
        room: data.room
      });
      messageModel.create(message)
      .then(function(dbMessage){
        console.log(dbMessage);
      });
    });
  });

  return ioConnect;
};
