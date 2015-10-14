var APP = angular.module("APP");
APP.controller("applicationController", ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {

    $scope.user = _user.user;

    $scope.register = {
        email: "re@shipfeed.dk",
        first_name: "Rane",
        last_name: "Eriksen",
        password: "123123123",
        confirm_password: "123123123",
        remember_me: false
    };

    $scope.notifications = _notifications.list;

    $scope.local_sign_in = function() {
        var _this = this;
        _user.local_sign_in($scope.register.email,
                $scope.register.password,
                $scope.register.remember_me)
            .then(function(result) {
                _notifications.handle_success(result.notifications);
                $("#modal-local-sign-in").modal("hide");
            })
            .catch(function(err) {
                _notifications.handle_error(err.data.notifications);
            });
    };

    $scope.local_sign_up = function() {
        var _this = this;
        _user.local_sign_up(
                $scope.register.email,
                $scope.register.first_name,
                $scope.register.last_name,
                $scope.register.password,
                $scope.register.confirm_password)
            .then(function(result) {
                _notifications.handle_success(result.notifications);
                $("#modal-local-sign-up").modal("hide");
            })
            .catch(function(err) {
                _notifications.handle_error(err.data.notifications);
            });
    };

    $scope.social_signin = function(destination) {
        _user.social_sign_in(destination)
            .finally(function() {
                _this.$apply();
            });
    };
}]);