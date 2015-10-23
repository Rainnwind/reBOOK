var APP = angular.module("APP");
APP.controller("bugsController", ["$scope", "_bugs", "$stateParams", function($scope, _bugs, $stateParams) {
    $scope.bugs = {
        list: _bugs.bugs,
        eps: 15,
        begin: 0,
        cp: parseInt($stateParams.page),
        mp: 7
    };

    (function init() {
        _bugs.get_bugs();
    })();

    $scope.display_bug = function(bug) {
        bug.display = !bug.display;
        console.log(bug);
    };
}]);