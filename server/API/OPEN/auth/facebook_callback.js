var passport = require("passport");
module.exports = function(_request, _response, _next) {
    passport.authenticate("facebook", {
        successRedirect: "/api/open/facebook/success",
        failureRedirect: "/api/open/facebook/fail"
    }, function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response.send('<script>window.opener._auth_callback("facebook", ' + JSON.stringify(user.toJSON()) + ');</script>');
                } else {
                    console.trace(err);
                    _response.send('<script>window.opener._auth_callback("facebook", false, "Failed to sign you in via facebook");</script>');
                }
            });
        } else {
            if (typeof err === "string")
                _response.send('<script>window.opener._auth_callback("facebook", false, "' + err + '");</script>');
            else if (typeof err === "object") {
                console.trace(err);
                _response.send('<script>window.opener._auth_callback("facebook", false, "' + err.message + '");</script>');
            } else {
                console.trace(err);
                _response.send('<script>window.opener._auth_callback("facebook", false, "Failed to sign you in via facebook");</script>');
            }
        }
    })(_request, _response, _next);
}