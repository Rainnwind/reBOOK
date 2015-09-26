var passport = require("passport"),
    API_PROFILE = require(process.env.APP_API_PROFILE);

module.exports = function(_request, _response, _next) {
    if (!_request.query.username) {
        _response
            ._ember_response
            ._ERROR("No username given")
            ._STATUS(400)
            ._send();
    } else if (!_request.query.password || _request.query.password.length < 8) {
        _response
            ._ember_response
            ._ERROR("Password must be at least 8 characters")
            ._send();
    } else {
        _request.body = _request.query; //Makes sure that passport can read credentials
        passport.authenticate("local-login", function(err, user, info) {
            if (!err) {
                _request.logIn(user, function(err) {
                    if (!err) {
                        if (_request.query.remember_me == "true") {
                            _request.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
                        }
                        _response
                            ._ember_response
                            ._SUCCESS("You are signed in")
                            ._send();
                    } else if (typeof err === "string") {
                        _response
                            ._ember_response
                            ._ERROR(err)
                            ._STATUS(400)
                            ._send();
                    } else {
                        console.trace(err);
                        _response
                            ._ember_response
                            ._ERROR("Unknown error")
                            ._STATUS(500)
                            ._send();
                    }
                });
            } else if (typeof err === "string") {
                _response
                    ._ember_response
                    ._ERROR(err)
                    ._STATUS(400)
                    ._send();
            } else {
                console.trace(err);
                _response
                    ._ember_response
                    ._ERROR("Unknown error")
                    ._STATUS(500)
                    ._send();
            }
        })(_request, _response, _next);
    }
};