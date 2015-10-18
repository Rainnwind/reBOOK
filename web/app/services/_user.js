var APP = angular.module("APP");

APP.factory("_user", ["$q", "$http", "_notifications", function($q, $http, _notifications) {

    var _user = {
        _id: undefined
    };

    return {
        user: _user,
        get_user_silent: function() {
            var _this = this;
            var deferred = $q.defer();
            if (!_user._id) {
                $http({
                        method: "GET",
                        url: "/api/users/user"
                    })
                    .then(function(result) {
                        angular.copy(result.data.user, _user);
                        deferred.resolve(result.data.user);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
            } else {
                deferred.resolve(_user);
            }
            return deferred.promise;
        },
        local_sign_in: function(email, password, remember_me) {
            var _this = this;
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: "/api_open/auth/local",
                    params: {
                        email: email,
                        password: password,
                        remember_me: remember_me
                    }
                })
                .then(function(result) {
                    _notifications.handle_success(result.notifications);
                    angular.copy(result.data.user, _user);
                    deferred.resolve(result);
                })
                .catch(function(err) {
                    _notifications.handle_error(err.data.notifications);
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        local_sign_up: function(email, first_name, last_name, password, confirm_password) {
            var _this = this;
            var deferred = $q.defer();
            if (_user._id) {
                _notifications.ERROR("You are already signed in");
                deferred.reject();
            } else {
                $http({
                        method: "POST",
                        url: "/api_open/auth/local",
                        data: {
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            password: password,
                            confirm_password: confirm_password
                        }
                    })
                    .then(function(result) {
                        _notifications.handle_success(result.notifications);
                        angular.copy(result.data.user, _user);
                        deferred.resolve(result);
                    })
                    .catch(function(err) {
                        _notifications.handle_error(err.data.notifications);
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        },
        social_sign_in: function(destination) {
            var _this = this;
            var deferred = $q.defer();
            var width = 1000;
            var height = 700;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            var auth_window = window.open(destination, "_blank", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
            window._auth_callback = function(platform, user) {
                if (user) {
                    _notifications.SUCCESS("Signed you in via " + platform + "!");
                    angular.copy(user, _user);
                    $("#modal-local-sign-in").modal("hide");
                    $("#modal-local-sign-up").modal("hide");
                    deferred.resolve();
                } else {
                    _notifications.ERROR("Failed to sign you in via " + platform);
                    deferred.reject();
                }
                auth_window.close();
            };
            return deferred.promise;
        }
    };
}]);