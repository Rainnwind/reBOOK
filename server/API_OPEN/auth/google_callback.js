var passport = require("passport");
module.exports = function(_request, _response, _next) {
    passport.authenticate("google", {
        successRedirect: "/api_open/google/success",
        failureRedirect: "/api_open/google/fail"
    }, function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response.send('<script>window.opener._auth_callback("google", ' + JSON.stringify(user.toJSON()) + ');</script>');
                } else {
                    console.trace(err);
                    _response.send('<script>window.opener._auth_callback("google", false);</script>');
                }
            });
        } else {
            console.trace(err);
            _response.send('<script>window.opener._auth_callback("google", false);</script>');
        }
    })(_request, _response, _next);
}