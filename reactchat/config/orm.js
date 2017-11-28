// Connect to connection.js file
var connection = require("./connection");

// ORM
var orm = {
  // Select all
  all: function(userMessage, cb) {
    var queryString = "SELECT * FROM messages;";
    connection.query(
      queryString,
      [userMessage.username, userMessage.message],
      function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      }
    );
  },
  // Create
  create: function(userMessage, cb) {
    var queryString = "INSERT INTO messages(username, message) VALUES(?, ?);";
    connection.query(
      queryString,
      [userMessage.username, userMessage.message],
      function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      }
    );
  }
};

// Export
module.exports = orm;
