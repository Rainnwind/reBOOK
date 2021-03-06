var APP = angular.module("APP");
APP.controller("applicationController", ["$scope", "_user", "_notifications", "_load", "_language", function($scope, _user, _notifications, _load, _language) {

    $scope.language = _language;

    $scope.load = _load;

    $scope.user = _user.user;

    $scope.register = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        remember_me: false
    };

    $scope.notifications = _notifications.list;

    $scope.local_sign_in = function() {
        var _this = this;
        _user.local_sign_in($scope.register.email,
                $scope.register.password,
                $scope.register.remember_me)
            .then(function(result) {
                $("#modal-local-sign-in").modal("hide");
            })
            .catch(function(err) {
                //Notifications are automatically set
                //Only specific action needed here
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
                $("#modal-local-sign-up").modal("hide");
            })
            .catch(function(err) {
                //Notifications are automatically set
                //Only specific action needed here
            });
    };

    $scope.social_signin = function(destination) {
        _user.social_sign_in(destination)
            .finally(function() {});
    };
}]);