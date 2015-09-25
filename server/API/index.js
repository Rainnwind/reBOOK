var express = require('express'),
    router = express.Router();


router.use("/auth", require("./auth"));
router.use("/users", require("./users"));

module.exports = router;