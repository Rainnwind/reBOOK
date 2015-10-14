var express = require('express'),
    router = express.Router();

router.route("/")
    .post(require("./POST"));

module.exports = router;