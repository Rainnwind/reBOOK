var passport = require("passport"),
    API_PROFILE = require(process.env.APP_API_PROFILE),
    API_TIME = require(process.env.APP_API_TIME),
    USERS_COUCH_PROFILE = require(process.env.APP_USERS_COUCH_PROFILE),
    API_MAIL = require(process.env.APP_API_MAIL);

module.exports = function(_request, _response, _next) {
    var _user_request = _request.body;

    if (!_user_request.first_name) {
        _response
            ._ember_response
            ._ERROR("Please fill out first name")
            ._STATUS(400)
            ._send();
    } else if (!_user_request.username || _user_request.username.length < 4) {
        _response
            ._ember_response
            ._ERROR("Username must be at least 4 characters")
            ._STATUS(400)
            ._send();
    } else if (!API_PROFILE.is_email(_user_request.email)) {
        _response
            ._ember_response
            ._ERROR("E-mail is invalid")
            ._STATUS(400)
            ._send();
    } else if (!_user_request.password || _user_request.password.length < 8) {
        _response
            ._ember_response
            ._ERROR("Password must be at least 8 characters")
            ._STATUS(400)
            ._send();
    } else if (!_user_request.confirm_password || _user_request.confirm_password !== _user_request.password) {
        _response
            ._ember_response
            ._ERROR("Passwords do not match")
            ._STATUS(400)
            ._send();
    } else if (_user_request.terms_accepted != "true") {
        _response
            ._ember_response
            ._ERROR("Please accept terms of use")
            ._STATUS(400)
            ._send();
    } else {
        var _new_user = new USERS_COUCH_PROFILE();
        _new_user._id = API_PROFILE.username_to_char(_user_request.username);
        _new_user.first_name = _user_request.first_name;
        _new_user.last_name = _user_request.last_name;
        _new_user.username = _user_request.username;
        _new_user.email = _user_request.email;
        _new_user.phone_no = _user_request.phone_no;
        _new_user.password = API_PROFILE.hash_value(_user_request.password);
        _new_user.created = API_TIME.get_zero_time();
        _new_user.verification_code = API_PROFILE.verification_code();

        _request.body = _new_user;

        passport.authenticate("local-signup", function(err, user, info) {
            if (!err) {
                API_MAIL.email_confirmation(user);
                _request.logIn(user, function(err) {
                    if (!err) {
                        _response
                            ._ember_response
                            ._SUCCESS("You are signed in")
                            ._send();
                    } else if (typeof err === "string") {
                        console.trace(err);
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
                console.trace(err);
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
}