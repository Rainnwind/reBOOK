var express = require('express'),
    router = express.Router(),
    passport = require("passport");

/****************************************************
 *                                                  *
 *      Takes care of local login and sign up       *
 *                                                  *
 ****************************************************/
router.route("/local")
    .get(require("./local-login"))
    .post(require("./local-signup"));

/****************************************************
 *                                                  *
 *     Takes care of google login and sign up       *
 *                                                  *
 ****************************************************/
router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
//router.use("/google/callback", express.static(process.env.APP_CLIENT_FOLDER));
router.get('/google/callback', require("./google_callback"));
/****************************************************
 *                                                  *
 *     Takes care of facebook login and sign up     *
 *                                                  *
 ****************************************************/

router.get("/facebook", passport.authenticate('facebook', {
    scope: ['public_profile','email']
}));

router.get("/facebook/callback", require("./facebook_callback"));

module.exports = router;