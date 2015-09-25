var NANO = require(process.env.APP_NANO),

    DB_USERS = NANO.use(process.env.APP_DB_USERS),
    passport = require("passport");

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    DB_USERS.get(id, function(err, body) {
        delete body.password;
        done(err, body);
    });
});

require("./strategies/local-signup.js")();
require("./strategies/local-login.js")();
require("./strategies/google.js")();
require("./strategies/facebook.js")();