var DB_LANGUAGE = require(process.env.APP_DB_LANGUAGE);
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(_request, _response) {
    DB_LANGUAGE.update({
        base: _request.body.base
    }, {
        $set: {
            english: _request.body.english,
            danish: _request.body.danish
        }
    }, function(err, body) {
        if (!err) {
            _response
                ._response
                ._SUCCESS("Language updated")
                ._send();
        } else {
            _response
                ._response
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._send();
            console.trace(err);
        }
    })
};