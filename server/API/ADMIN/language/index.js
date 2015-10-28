var express = require('express'),
    router = express.Router();

router.route("/")
    .get(require("./GET"))
    .put(require("./PUT"));

module.exports = router;