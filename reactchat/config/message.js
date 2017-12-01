const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: { 
   type: String,
   required: true },
  message: { 
  	type: String,
  	required: true },
  date: { 
  	type: Date, 
  	default: Date.now }
});


const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;