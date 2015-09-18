var express = require('express'),
    router = express.Router();

router.use("/", express.static(process.env.APP_CLIENT_FOLDER));

module.exports = router;