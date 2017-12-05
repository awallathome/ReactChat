const router = require("express").Router();
const messageRoutes = require("./message");

// Messgae routes
router.use("/Message", messageRoutes);
module.exports = router;