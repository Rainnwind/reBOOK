var passport = require("passport");
module.exports = function(_request, _response, _next) {
    passport.authenticate("google", {
        successRedirect: "/auth/google/success",
        failureRedirect: "/auth/google/fail"
    }, function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response.send('<script>window.opener._auth_callback("google", true);</script>');
                } else {
                    _response.send('<script>window.opener._auth_callback("google", false);</script>');
                }
            });
        } else {
            _response.send('<script>window.opener._auth_callback("google", false);</script>');
        }
    })(_request, _response, _next);
}