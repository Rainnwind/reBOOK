var express = require('express'),
    router = express.Router();

router.use("/auth", require("./auth"));
router.use("/bugs", require("./bugs"));
router.use("/language", require("./language"));

module.exports = router;