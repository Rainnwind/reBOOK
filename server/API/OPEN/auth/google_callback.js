var passport = require("passport");
module.exports = function(_request, _response, _next) {
    passport.authenticate("google", {
        successRedirect: "/api/open/google/success",
        failureRedirect: "/api/open/google/fail"
    }, function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response.send('<script>window.opener._auth_callback("google", ' + JSON.stringify(user.toJSON()) + ');</script>');
                } else {
                    console.trace(err);
                    _response.send('<script>window.opener._auth_callback("google", false, "Failed to sign you in via google");</script>');
                }
            });
        } else {
            if (typeof err === "string")
                _response.send('<script>window.opener._auth_callback("google", false, "' + err + '");</script>');
            else if (typeof err === "object") {
                console.trace(err);
                _response.send('<script>window.opener._auth_callback("google", false, "' + err.message + '");</script>');
            } else {
                console.trace(err);
                _response.send('<script>window.opener._auth_callback("google", false, "Failed to sign you in via google");</script>');
            }
        }
    })(_request, _response, _next);
}