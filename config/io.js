// This page defines the server-side listener for socket emits
var io = require("socket.io");
var messageModel = require("./message");

// Socket.io emit function
module.exports = function(http) {
  var ioConnect = io(http);
  ioConnect.on("connection", function(socket) {
    socket.on("room", function(room) {
      if (socket.room) socket.leave(socket.room);

      socket.room = room;
      socket.join(room);
    });

    socket.on("message-server", function(message) {
      messageModel.create(message).then(function(dbMessage) {
        ioConnect.in(message.room).emit("message", dbMessage);
      });
    });
  });

  return ioConnect;
};
