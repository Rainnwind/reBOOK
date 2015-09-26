var NANO = require(process.env.APP_NANO),
    DB_USERS = NANO.use(process.env.APP_DB_USERS),

    USERS_COUCH_PROFILE = require(process.env.APP_USERS_COUCH_PROFILE),
    USERS_RESPONSE_PROFILE = require(process.env.APP_USERS_RESPONSE_PROFILE),
    API_TIME = require(process.env.APP_API_TIME),

    passport = require("passport"),
    FacebookStrategy = require("passport-facebook");

module.exports = function() {

    passport.use(new FacebookStrategy({

            clientID: process.env.APP_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.APP_FACEBOOK_SECRET,
            callbackURL: process.env.APP_FACEBOOK_CALLBACK_URL

        },
        function(token, refreshToken, profile, done) {
            DB_USERS.get(profile.id, function(err, body) {
                if (!err) {
                    done(null, body);
                } else if (err.statusCode === 404) {
                    var _new_user = new USERS_COUCH_PROFILE();
                    _new_user._id = profile.id;
                    _new_user.first_name = profile.name.givenName || undefined;
                    _new_user.last_name = profile.name.familyName || undefined;
                    if (profile.emails) {
                        _new_user.email = profile.emails[0].value || undefined;
                    }
                    _new_user.created = API_TIME.get_zero_time();

                    DB_USERS.insert(_new_user, function(err, body) {
                        if (!err) {
                            done(null, _new_user);
                        } else {
                            console.trace(err);
                            done("Failed to sign you in via google");
                        }
                    })
                } else {
                    console.trace(err);
                    done("Failed to sign you in via google");
                }
            });
        }));
}