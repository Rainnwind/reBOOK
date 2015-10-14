var passport = require("passport");

module.exports = function(_request, _response, _next) {
    _request.body = _request.query; //Makes sure that passport can read credentials

    passport.authenticate("local-login", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    if (_request.body.remember_me == "true") {
                        _request.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
                        console.log("Session cookie is being set");
                    }
                    _response
                        ._response
                        ._DATA("user", user.toJSON())
                        ._SUCCESS("You are signed in")
                        ._send();
                } else if (typeof err === "string") {
                    _response
                        ._response
                        ._ERROR(err)
                        ._STATUS(400)
                        ._send();
                } else {
                    console.trace(err);
                    _response
                        ._response
                        ._ERROR("Unknown error")
                        ._STATUS(500)
                        ._send();
                }
            });
        } else if (typeof err === "string") {
            _response
                ._response
                ._ERROR(err)
                ._STATUS(400)
                ._send();
        } else {
            console.trace(err);
            _response
                ._response
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._send();
        }
    })(_request, _response, _next);
};