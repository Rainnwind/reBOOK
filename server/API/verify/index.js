var express = require('express'),
    router = express.Router();


router.use("/email", require("./email"));

module.exports = router;