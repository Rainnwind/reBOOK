var DB_LANGUAGE = require(process.env.APP_DB_LANGUAGE);
module.exports = function(_request, _response) {
    DB_LANGUAGE.find({}, function(err, body) {
        if (!err) {
            _response
                ._response
                ._DATA("languages", body)
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
};