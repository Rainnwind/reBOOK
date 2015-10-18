var express = require('express'),
    router = express.Router();

router.use("/auth", require("./auth"));
router.use("/bugs", require("./bugs"));
module.exports = router;