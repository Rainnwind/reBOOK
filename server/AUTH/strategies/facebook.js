var DB_USERS = require(process.env.APP_DB_USERS),

    passport = require("passport"),
    FacebookStrategy = require("passport-facebook");

module.exports = function() {

    passport.use(new FacebookStrategy({

            clientID: process.env.APP_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.APP_FACEBOOK_SECRET,
            callbackURL: process.env.APP_FACEBOOK_CALLBACK_URL,
            profileFields: ["id", "email", "displayName", "name", "gender", "profileUrl"]

        },
        function(token, refreshToken, profile, done) {
            console.log(profile);
            DB_USERS.findOne({
                "facebook.id": profile.id
            }, function(err, user) {
                if (err) {
                    console.trace(err);
                    done(err);
                } else if (user) {
                    done(null, user);
                } else {
                    if (!profile.emails) {
                        done("No e-mail was provided by facebook");
                    } else {
                        new DB_USERS({
                                email: profile.emails[0].value,
                                first_name: profile.name.givenName,
                                last_name: profile.name.familyName,
                                facebook: {
                                    id: profile.id,
                                    token: token
                                },
                                password: new Date().getTime().toString()
                            })
                            .save(function(err, user) {
                                if (!err) {
                                    done(null, user);
                                } else {
                                    console.trace(err);
                                    done("Failed to sign you in via google");
                                }
                            });
                    }
                }
            });

        }));
}