var express = require('express'),
    router = express.Router(),
    passport = require("passport"),
    USERS_RESPONSE_PROFILE = require(process.env.APP_USERS_RESPONSE_PROFILE);

router.route("/user")
    .get(require("./GET"))
    .put(require("./PUT"))
    .delete(require("./DELETE"));

module.exports = router;