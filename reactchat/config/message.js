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
  	default: Date.now },
  room: {
    type: Schema.Types.ObjectId, 
    ref: "Room"
  }
});


const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;