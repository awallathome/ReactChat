// Connect to connection.js file
const mongoose = require("mongoose");
// ORM

  // Select all
  
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  date: { 
  	type: Date, 
  	default: Date.now }
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;

