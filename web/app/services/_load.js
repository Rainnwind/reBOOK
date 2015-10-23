var APP = angular.module("APP");

APP.factory("_load", ["$q", "$http", "$timeout", function($q, $http, $timeout) {
    return {
        count: 0,
        inc_loading: function() {
            this.count++;
        },
        dec_loading: function() {
            if (this.count > 0)
                this.count--;
        },
        request: function(url, method, data) {
            var _this = this;
            var deferred = $q.defer();
            _this.count++;

            var http_object = {
                url: url,
                method: method
            };
            if (method === "GET")
                http_object.params = data;
            else
                http_object.data = data;

            $http(http_object)
                .then(function(result) {
                    deferred.resolve(result);
                })
                .catch(function(response) {
                    deferred.reject(response);
                })
                .finally(function() {
                    if (_this.count > 0)
                        _this.count--;
                });
            return deferred.promise;
        },
        post: function(url, data) {
            return this.request(url, "POST", data);
        },
        get: function(url, data) {
            return this.request(url, "GET", data);
        },
        delete: function(url, data) {
            return this.request(url, "DELETE", data);
        },
        put: function(url, data) {
            return this.request(url, "PUT", data);
        },
        patch: function(url, data) {
            return this.request(url, "PATCH", data);
        }
    };
}]);