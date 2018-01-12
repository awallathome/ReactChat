// Import the mongoose ORM to access functions that will interact with the database.
const db = require("mongoose");

function messageModel() {

//the findAll function is called when a room is visited for the first time displaying all existing messages
  module.exports = {
    findAll: function(req, res) {
      db.message
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
//the create function is run each time a messages is sent, adding it to the conversation stored in the database
    create: function(req, res) {
      db.message
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
//when a user clicks the button to delete the database, the entire conversation is erased from the MongoDB, however the database still persists (as does the room itself)
    remove: function(req, res) {
      db.message
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  };
}

// Here, we export the entire CRUD model for messaging
module.exports = messageModel;
