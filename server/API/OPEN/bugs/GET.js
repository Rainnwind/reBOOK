var DB_BUGS = require(process.env.APP_DB_BUGS);
module.exports = function(_request, _response) {
    DB_BUGS.find({
        display_on_site: true
    }, function(err, bugs) {
        if (!err) {
            var _bugs = [];
            _response
                ._response
                ._DATA("bugs", _bugs);

            bugs.forEach(function(bug) {
                _bugs.push(bug.toJSON());
            });
            _response.
            _response
                ._send();
        } else {
            console.trace(err);
            _response.
            _response
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._send();
        }
    });
}