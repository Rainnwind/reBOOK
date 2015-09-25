var uuid = require("uuid");
module.exports = function(_request, _response, _next) {
    _response._ember_response = new function() {
        var _response_ = _response;

        var _this = this;

        var MESSAGES = [];

        var RESPONSE = {
            "system-notifications": MESSAGES,
        };


        _this._ERROR = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "ERROR"
            });
            return _this;
        }

        _this._INFO = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "INFO"
            });
            return _this;
        }

        _this._SUCCESS = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "SUCCESS"
            });
            return _this;
        }

        _this._DATA = function(key, object) {
            RESPONSE[key] = object;
            return _this;
        }

        _this._STATUS = function(statusCode) {
            _response_.status(statusCode);
            return _this;
        }


        _this._send = function() {
            var errors = [];
            MESSAGES.forEach(function(message) {
                if (message.type === "ERROR") {
                    errors.push({
                        message: message.message,
                        type: message.type
                    });
                }
            });
            if (errors.length > 0) {
                RESPONSE.errors = errors;
            }
            _response_
                .send(RESPONSE);
        }
    }
    _next();
}