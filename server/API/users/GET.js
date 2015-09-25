var USERS_RESPONSE_PROFILE = require(process.env.APP_USERS_RESPONSE_PROFILE);

module.exports = function(_request, _response) {
    _response
        ._ember_response
        ._DATA("user", new USERS_RESPONSE_PROFILE(_request.user))
        ._send();
}