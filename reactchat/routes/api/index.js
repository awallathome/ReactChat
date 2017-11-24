const router = require("express").Router();
const articleRoutes = require("./articles");
const nytRoutes = require("./nyt");
// NYT routes
router.use("/articles", articleRoutes);
module.exports = router;