var express = require('express'),
    router = express.Router();
var passport = require("passport");

router.use("/", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/find", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/sell", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/wtf", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/bugs", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/overview", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/stats", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/messages", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/books", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/settings", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/wishlist", express.static(process.env.APP_CLIENT_FOLDER));


router.use("/auth/google/success", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/google/fail", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/facebook/success", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/facebook/fail", express.static(process.env.APP_CLIENT_FOLDER));

router.use("/verify/email/:id/:token", express.static(process.env.APP_CLIENT_FOLDER));

router.use(require(process.env.APP_EXPRESS_REPONSE));

router.use("/api/auth", require("./API/auth"));

router.use("/api",
    require(process.env.APP_EXPRESS_IS_AUTHENTICATED),
    require("./API"));


// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;