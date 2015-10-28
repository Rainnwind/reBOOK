var DB_LANGUAGE = require(process.env.APP_DB_LANGUAGE);
module.exports = function(_request, _response) {
    var base = _request.query.base;
    var current_language = _request.params.current_language;
    console.log("Base: " + base);
    console.log("Current language: " + current_language);

    DB_LANGUAGE.findOne({
        base: base
    }, function(err, body) {
        if (!err) {
            if (!body) { //Create language to database
                console.log("Creating the new language object");
                var translation = new DB_LANGUAGE({
                    base: base,
                });
                translation.save(function(err, body) {
                    if (!err) {
                        _response
                            ._response
                            ._DATA("translation", translation[current_language])
                            ._send();
                    } else {
                        console.trace(err);
                        _response
                            ._response
                            ._ERROR("Failed to translate " + base)
                            ._STATUS(500)
                            ._send();
                    }
                });
            } else {
                _response
                    ._response
                    ._DATA("translation", body[current_language])
                    ._send();
            }
        } else {
            console.trace(err);
            _response
                ._response
                ._ERROR("Failed to translate " + base)
                ._STATUS(500)
                ._send();
        }
    });
};