// Import the ORM to create functions that will interact with the database.
var orm = require("../../../../config/orm.js");

// Socket.io dependency
var ioConnect = require("../../../../config/io");

var messageModel = {
  // Get old messages
  all: function(cb) {
    orm.all("messages", function(res) {
      cb(res);
    });
  },
  // Post new message
  create: function(userMessage, cb) {
    orm.create(userMessage, cb);
  }
};

// Export
module.exports = messageModel;
