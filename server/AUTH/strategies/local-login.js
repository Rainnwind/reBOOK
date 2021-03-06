var DB_USERS = require(process.env.APP_DB_USERS),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            DB_USERS.findOne({
                    email: email.toLowerCase()
                })
                .then(function(user) {
                    if (user) {
                        if (user.compare_password(password)) {
                            done(null, user);
                        } else {
                            done("Username or password is incorrect");
                        }
                    } else {
                        done("Username or password is incorrect");
                    }
                })
                .catch(function(err) {
                    done("Unknown error");
                    console.trace(err);
                });
        }));

}