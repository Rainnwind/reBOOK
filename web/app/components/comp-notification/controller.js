/**
 * Expects notification to be given to the component
 * Example: <comp-notification notification=notification></comp-notification>
 */
var APP = angular.module("APP");
APP.directive("compNotification", [function() {
    return {
        templateUrl: "components/comp-notification/template.html",
        scope: {
            notification: "=notification"
        },
        controller: ["$scope", "_notifications", function($scope, _notifications) {
            $scope.class = "error";
            $scope.message = $scope.notification.message;
            $scope.id = $scope.notification.id;
            $scope.icon = "fa-ban";

            $scope.remove = function() {
                _notifications.remove($scope.notification);
            };

            (function init() {
                switch ($scope.notification.type) {
                    case "ERROR":
                        $scope.class = "error";
                        $scope.icon = "fa-ban";
                        break;
                    case "SUCCESS":
                        $scope.class = "success";
                        $scope.icon = "fa-check-circle";
                        break;
                    case "INFO":
                        $scope.class = "info";
                        $scope.icon = "fa-info-circle";
                        break;
                }
            })();
        }],
    };
}]);