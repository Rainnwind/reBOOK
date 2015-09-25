var NANO = require(process.env.APP_NANO),

    DB_USERS = NANO.use(process.env.APP_DB_USERS),
    USERS_COUCH_PROFILE = require(process.env.APP_USERS_COUCH_PROFILE),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(_request, email, password, done) {
            DB_USERS.insert(_request.body, function(err, body) {
                if (!err) {
                    done(null, _request.body);
                } else if (err.statusCode === 409) {
                    done("E-mail is already in use")
                } else {
                    done(err);
                }
            });
        }));

};