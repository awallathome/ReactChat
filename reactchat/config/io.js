// This page defines the server-side listener for socket emits
var io = require("socket.io");
// var messageModel = require("../client/src/Components/messages/message");

// Socket.io emit function
module.exports = function(http) {
  var ioConnect = io(http);
  ioConnect.on("connection", function(socket) {
    socket.on("message", function(message) {});
  });
  return ioConnect;
};
