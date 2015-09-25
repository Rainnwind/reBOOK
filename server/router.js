var express = require('express'),
    router = express.Router();
var passport = require("passport");

router.use("/", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/sell", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/books", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/profile/settings", express.static(process.env.APP_CLIENT_FOLDER));

router.use("/auth/google/success", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/google/fail", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/facebook/success", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/auth/facebook/fail", express.static(process.env.APP_CLIENT_FOLDER));

router.use("/api", require(process.env.APP_EXPRESS_REPONSE));
router.use("/api/auth", require("./API/auth"));
router.use("/api", isLoggedIn, require("./API"));


// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(_request, _response, _next) {

    // if user is authenticated in the session, carry on 
    if (_request.isAuthenticated())
        return _next();

    _response
        ._ember_response
        ._ERROR("You need to sign in")
        ._STATUS(401)
        ._send();
}


module.exports = router;