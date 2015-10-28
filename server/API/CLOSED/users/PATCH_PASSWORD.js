module.exports = function(_request, _response) {
    if (_request.body.password !== _request.user.password) {
        _response
            .ember_response
            ._ERROR("Password do not match existing password")
            ._STATUS(400)
            ._send();
    } else {
        if (!_request.body.new_password || _request.body.new_password.length < 8) {
            _response
                .ember_response
                ._ERROR("Password must be at least 8 characters")
                ._STATUS(400)
                ._send();

        } else if (_request.body.confirm_password || _request.body.confirm_password !== _request.body.new_password) {
            _response
                ._ember_response
                ._ERROR("Passwords do not match")
                ._STATUS(400)
                ._send();
        } else {
            _response
                ._ember_response
                ._SUCCESS("Password changed!")
                ._send();
        }
    }
}