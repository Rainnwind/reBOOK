var APP = angular.module("APP");

APP.factory("_bugs", ["$q", "$http", "_notifications", "_load", function($q, $http, _notifications, _load) {
    var initialized = false;
    var bugs = [];

    return {
        bugs: bugs,
        get_bugs: function() {
            var _this = this;
            var deferred = $q.defer();
            if (!initialized) {
                _load.get("/api/open/bugs")
                    .then(function(result) {
                        initialized = true;
                        result.data.bugs.forEach(function(bug) {
                            bugs.push(bug);
                        });
                    })
                    .catch(function(result) {
                        _notifications.handle_error(result.data.notifications);
                    });
            } else {
                deferred.resolve(_this._bugs);
            }
            return deferred.promise;
        },
        submit: function(data) {
            var _this = this;
            var deferred = $q.defer();
            $http.post("/api/open/bugs", data)
                .then(function(result) {
                    deferred.resolve();
                    if (data.display_on_site) {
                        bugs.push(result.data.bug);
                    }
                    _notifications.handle_success(result.data.notifications);
                })
                .catch(function(err) {
                    deferred.reject();
                    _notifications.handle_error(err.data.notifications);
                });
            return deferred.promise;
        }
    };

}]);