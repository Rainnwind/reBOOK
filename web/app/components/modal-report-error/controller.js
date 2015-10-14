var APP = angular.module("APP");
APP.directive("modalReportError", [function() {
    return {
        templateUrl: "components/modal-report-error/template.html",
        scope: {
            user: "="
        },
        controller: ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {

            $scope.name = ((_user.user.first_name || "") + " " + (_user.user.last_name || "")).trim();
            $scope.email = _user.user.email;
            $scope.report = "";
            $scope.contact_later = false;
            $scope.display_on_site = true;

            $scope.submit = function() {
                _notifications.INFO("We are about to send this fucker!");
            };
        }],
        link: function(scope, element) {
            var modal = $(element).find(".modal-dialog");
            $(modal).draggable({
                handle: ".modal-header"
            });
        }
    };
}]);