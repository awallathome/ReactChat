const router = require("express").Router();
const messageController = require("../../controllers/MessageController");
// Matches with "/api/message"
router.route("/")
  .get(messageController.findAll)
  .post(messageController.create);
// Matches with "/api/message/:id"
router
  .route("/:id")
  .get(bessageController.findById)
  .put(messageController.update)
  .delete(messageController.remove);
module.exports = router;