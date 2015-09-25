var NANO = require(process.env.APP_NANO),

    DB_USERS = NANO.use(process.env.APP_DB_USERS),

    API_PROFILE = require(process.env.APP_API_PROFILE),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            DB_USERS.get(API_PROFILE.email_to_char(email), function(err, body) {
                if (!err) {
                    if (body.password === API_PROFILE.hash_value(password)) {
                        done(null, body);
                    } else {
                        done("E-mail or password is incorrect");
                    }
                } else {
                    done(err);
                }
            });

        }));

}