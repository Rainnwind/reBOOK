var APP = angular.module("APP");

APP.factory("_user", ["$q", "$http", "_notifications", "_load", function($q, $http, _notifications, _load) {

    return {
        user: {
            _id: undefined
        },
        get_user_silent: function() {
            var _this = this;
            var deferred = $q.defer();
            if (!_this.user._id) {
                _load.get("/api/closed/users/user")
                    .then(function(result) {
                        angular.copy(result.data.user, _this.user);
                        deferred.resolve(result.data.user);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
            } else {
                deferred.resolve(_this.user);
            }
            return deferred.promise;
        },
        local_sign_in: function(email, password, remember_me) {
            var _this = this;
            var deferred = $q.defer();
            _load.get("/api/open/auth/local", {
                    email: email,
                    password: password,
                    remember_me: remember_me
                })
                .then(function(result) {
                    _notifications.handle_success(result.notifications);
                    angular.copy(result.data.user, _this.user);
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
            if (_this.user._id) {
                _notifications.ERROR("You are already signed in");
                deferred.reject();
            } else {
                _load.post("/api/open/auth/local", {
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        password: password,
                        confirm_password: confirm_password
                    })
                    .then(function(result) {
                        _notifications.handle_success(result.notifications);
                        angular.copy(result.data.user, _this.user);
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
            var completed = false;

            _load.inc_loading();


            var auth_window = window.open(destination, "_blank", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);


            //Check every 200ms if the window is still open
            //If it not, decrease loading count
            var check_auth_window = function() {
                setTimeout(function() {
                    if (auth_window.closed) {
                        if (!completed) {
                            _load.dec_loading();
                            deferred.reject();
                        }
                    } else
                        check_auth_window();
                }, 200);
            };
            check_auth_window();
            window._auth_callback = function(platform, user, err) {
                if (user) {
                    _notifications.SUCCESS("Signed you in via " + platform + "!");
                    angular.copy(user, _this.user);
                    $("#modal-local-sign-in").modal("hide");
                    $("#modal-local-sign-up").modal("hide");
                    _load.dec_loading();
                    completed = true;
                    deferred.resolve();
                } else {
                    _notifications.ERROR(err);
                    _load.dec_loading();
                    completed = true;
                    deferred.reject();
                }
                auth_window.close();
            };
            return deferred.promise;
        }
    };
}]);