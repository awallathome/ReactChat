// Import the ORM to create functions that will interact with the database.
// var orm = require("../../../../config/orm.js");

// // Socket.io dependency
// var ioConnect = require("../../../../config/io");

// var messageModel = {
//   // Get old messages
//   all: function(cb) {
//     orm.all("messages", function(res) {
//       cb(res);
//     });
//   },
//   // Post new message
//   create: function(userMessage, cb) {
//     orm.create(userMessage, cb);
//   }

// };

const db = require("../client/src/components/messages/message");
// Defining methods for the messageController
module.exports = {
  findAll: function(req, res) {
    db.message
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.message
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.message
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.message
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.message
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

// Export
module.exports = messageModel;
