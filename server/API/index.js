var express = require('express'),
    router = express.Router();

router.use("/open", require("./OPEN"));

router.use("/closed",
    require(process.env.APP_EXPRESS_IS_AUTHENTICATED),
    require("./CLOSED"));

router.use("/admin",
    require(process.env.APP_EXPRESS_IS_ADMIN),
    require("./ADMIN"));

module.exports = router;