var express = require('express'),
    router = express.Router();

router.use("/users", require("./users"));
//router.use("/verify", require("./verify"));
module.exports = router;