const router = require("express").Router();
// //The following object is for future use. 
// const messageController = require("../../controllers/MessageController");

// Matches with "/api/message"
router
  .route("/")
  .get(Message.find)
  .post(Message.create);

// Matches with "/api/message/:id"
router
  .route("/:id")
  .get(Message.find)
  .delete(Message.remove);

module.exports = router;