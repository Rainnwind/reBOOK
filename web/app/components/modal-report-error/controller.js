var APP = angular.module("APP");
APP.directive("modalReportError", ["_notifications", "$http", function(_notifications, $http) {
    return {
        templateUrl: "components/modal-report-error/template.html",
        controller: ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {

            //Importing user from _user
            $scope.user = _user.user;

            //Listening for change on user.id - Making sure that the modal is always up to date with full name and email
            $scope.$watch("user.id", function(v) {
                if (v) {
                    $scope.info.full_name = ($scope.user.first_name || "").trim() + " " + ($scope.user.last_name || "").trim();
                    $scope.info.email = $scope.user.email;
                }
            });

            //Actual data sent to back-end
            $scope.info = {
                full_name: "",
                email: "",
                report: "",
                contact_later: false,
                display_on_site: true
            };

            $scope.submit = function() {
                _notifications.INFO("Sending your report!");
                $http({
                        url: "/api_open/bugs",
                        method: "POST",
                        data: $scope.info
                    })
                    .then(function(result) {
                        console.log(result);
                        _notifications.handle_success(result.data.notifications);
                    })
                    .catch(function(err) {
                        _notifications.handle_error(err.data.notifications);
                    });
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