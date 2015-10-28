var DB_BUGS = require(process.env.APP_DB_BUGS);
module.exports = function(_request, _response) {
    var bug = new DB_BUGS(_request.body);
    bug.save(function(err, body) {
        if (!err) {
            _response
                ._response
                ._SUCCESS("Thank you for your feedback!")
                ._DATA("bug", body.toJSON())
                ._send();
        } else {
            _response
                ._response
                ._ERROR(err)
                ._STATUS(400)
                ._send();
        }
    });
}