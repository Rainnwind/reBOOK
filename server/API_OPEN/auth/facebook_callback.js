var passport = require("passport");
module.exports = function(_request, _response, _next) {
    passport.authenticate("facebook", {
        successRedirect: "/api_open/facebook/success",
        failureRedirect: "/api_open/facebook/fail"
    }, function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response.send('<script>window.opener._auth_callback("facebook", ' + JSON.stringify(user.toJSON()) + ');</script>');
                } else {
                    _response.send('<script>window.opener._auth_callback("facebook", false);</script>');
                }
            });
        } else {
            _response.send('<script>window.opener._auth_callback("facebook", false);</script>');
        }
    })(_request, _response, _next);
}