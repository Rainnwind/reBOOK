module.exports = function(_request, _response) {
    _response
        ._response
        ._DATA("user", _request.user.toJSON())
        ._send();
}