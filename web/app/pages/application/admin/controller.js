var APP = angular.module("APP");
APP.controller("adminController", ["$scope", "_language", function($scope, _language) {

    $scope.language = _language;

    $scope.save_language = function(language) {
        _language.save_language(language);
    };

    (function init() {
        _language.get_languages();
    })();
}]);