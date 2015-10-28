var express = require('express'),
    router = express.Router();

router.route("/:current_language")
    .get(require("./GET"));

module.exports = router;