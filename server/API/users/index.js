var express = require('express'),
    router = express.Router(),
    passport = require("passport");

router.route("/user")
    .get(require("./GET"))
//    .put(require("./PUT"))
  //  .delete(require("./DELETE"));

//router.route("/password")
  //  .patch(require("./PATCH_PASSWORD"));

module.exports = router;