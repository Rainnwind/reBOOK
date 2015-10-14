var NANO = require(process.env.APP_NANO),
    DB_USERS = NANO.use(process.env.APP_DB_USERS),
    API_TIME = require(process.env.APP_API_TIME),
    Q = require("q");

module.exports = function(_request, _response) {

    var upload_verified_email_user = function(_user) {
        var deferred = Q.defer();

        DB_USERS.insert(_user, function(err, body) {
            if (!err) {
                console.log(_user._rev);
                _user._rev = body.rev;
                console.log(_user._rev);
                deferred.resolve(_user);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    if (!_request.user.verified_since) {
        if (_request.body.id === _request.user._id && _request.body.token === _request.user.verification_code) {
            console.log(_request.user);
//            _request.user.verification_code = undefined;
  //          _request.user.verified_since = API_TIME.get_zero_time();
            upload_verified_email_user(_request.user)
                .then(function(_user) {
                    _response
                        ._ember_response
                        ._DATA("user", {
                            verified_since: API_TIME.get_zero_time(),//_user.verified_since,
                            user_id: _user._id
                        })
                        ._send();
                })
                .catch(function(err) {
                    console.trace(err);
                    _response
                        ._ember_response
                        ._ERROR('Wrong ID or token - Please request for new token')
                        ._STATUS(400)
                        ._send();
                });
        } else {
            _response
                ._ember_response
                ._ERROR('Wrong ID or token - Please request for new token')
                ._STATUS(400)
                ._send();
        }
    } else {
        _response
            ._ember_response
            ._ERROR("Your e-mail is verified")
            ._STATUS(400)
            ._send();
    }
    console.log(_request.user);
}