var express = require('express'),
    router = express.Router();

router.use("/language", require("./language"));

module.exports = router;