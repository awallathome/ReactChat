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

    socket.on("message", function(message) {
      if (socket.room) socket.leave(socket.room);
      socket.join(message.room);
      socket.room = message.room;
      messageModel.create(message).then(function(dbMessage) {
        socket.broadcast.to(message.room).emit("message", {
          name: dbMessage.name,
          message: dbMessage.message,
          room: dbMessage.room.toString(),
          _id: dbMessage._id
        });
      });
    });
  });

  return ioConnect;
};
