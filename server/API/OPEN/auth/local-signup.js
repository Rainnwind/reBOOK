var passport = require("passport");

module.exports = function(_request, _response, _next) {

    passport.authenticate("local-signup", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response
                        ._response
                        ._DATA("user", user.toJSON())
                        ._SUCCESS("You are signed in")
                        ._send();
                } else {
                    _response
                        ._response
                        ._ERROR(err)
                        ._STATUS(400)
                        ._send();
                }
            });
        } else {
            _response
                ._response
                ._ERROR(err)
                ._STATUS(400)
                ._send();
        }
    })(_request, _response, _next);
}