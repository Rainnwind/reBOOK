var APP = angular.module("APP");
APP.directive("modalReportError", ["_notifications", "$http", "_bugs", function(_notifications, $http, _bugs) {
    return {
        templateUrl: "components/modal-report-error/template.html",
        controller: ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {
            //Importing user from _user
            $scope.user = _user.user;
            $scope.submitting = false;

            var reset_info = function() {
                $scope.info = {
                    full_name: ($scope.user.first_name || "").trim() + " " + ($scope.user.last_name || "").trim(),
                    email: $scope.user.email,
                    subject: "",
                    report: "",
                    contact_later: false,
                    display_on_site: false
                };
            };

            //Listening for change on user.id - Making sure that the modal is always up to date with full name and email
            $scope.$watch("user.id", function(v) {
                if (v) {
                    reset_info();
                }
            });

            //Actual data sent to back-end
            $scope.info = {};


            //Submit report error modal to back-end
            $scope.submit = function() {
                if ($scope.submitting) {
                    _notifications.ERROR("Please only submit one at a time");
                    return;
                }

                $scope.submitting = true;
                _notifications.INFO("Sending your report!");
                _bugs.submit($scope.info)
                    .then(function(result) {
                        $("#modal-report-error").modal("hide");
                        //Resetting the bug report modal
                        reset_info();
                    })
                    .finally(function() {
                        $scope.submitting = false;
                    });
            };

            (function init() {
                reset_info();
            })();
        }],
        link: function(scope, element) {
            var modal = $(element).find(".modal-dialog");
            $(modal).draggable({
                handle: ".modal-header"
            });
        }
    };
}]);