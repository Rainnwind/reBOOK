var express = require('express'),
    router = express.Router();

router.route("/")
    .post(require("./POST"))
    .get(require("./GET"));

module.exports = router;