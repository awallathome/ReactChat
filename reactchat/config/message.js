const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  _id: { 
  	type: Schema.Types.ObjectId,
    required: true },
  Name: { 
   type: String,
   required: true },
  Messages: { 
  	type: String,
  	required: true },
  date: { 
  	type: Date, 
  	default: Date.now }


const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;