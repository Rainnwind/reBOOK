var APP = angular.module("APP");
APP.controller("profileController", ["$scope", "$state", "authorized", function($scope, $state, authorized) {
    $scope.authorized = authorized;
    (function init() {
        if (!authorized) {
            $state.go("index");
        }
    })();
}]);