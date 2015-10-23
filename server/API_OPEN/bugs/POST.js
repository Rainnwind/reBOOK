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
            var errors = err.errors;
            for (var key in errors) {
                if (errors.hasOwnProperty(key)) {
                    _response
                        ._response
                        ._ERROR(errors[key].message)
                }
            }
            _response
                ._response
                ._STATUS(400)
                ._send();
        }
    });
}