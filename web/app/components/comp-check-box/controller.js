/**
 * Expects bool to be given to the component
 * Expects label to be given
 * Example: <comp-check-box bool=[variable|bool] label=[variable|String]></comp-check-box>
 */

var APP = angular.module("APP");
APP.directive("compCheckBox", [function() {
    return {
        templateUrl: "components/comp-check-box/template.html",
        scope: {
            bool: "=", //Short for =bool (Object)
            label: "@" //Short for =label (String)
        },
        controller: ["$scope", function($scope) {

            $scope.click = function() {
                $scope.bool = !$scope.bool;
            };

            $scope.class = function() {
                return $scope.bool ? "fa fa-square-o" : "fa-check-square-o";
            };

        }]
    };
}]);