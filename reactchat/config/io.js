// This page defines the server-side listener for socket emits
var io = require("socket.io");
var messageModel = require("./message");

// Socket.io emit function
module.exports = function(http) {
  var ioConnect = io(http);
  ioConnect.on("connection", function(socket) {
    socket.on("message", function(message) {
      console.log(message.room.toString());
      
      messageModel.create(message)
      .then(function(dbMessage){
        socket.emit("message-" + dbMessage.room.toString(), {
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
