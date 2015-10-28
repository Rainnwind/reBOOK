var APP = angular.module("APP");
APP.directive("modalLanguage", [function() {
    return {
        templateUrl: "components/modal-language/template.html",
        controller: ["$scope", "_notifications", "_language", function($scope, _notifications, _language) {
            $scope._language = _language;
            $scope.submit = function() {
                _language.save_language($scope._language.translate_language)
                    .then(function() {
                        $("#modal-language").modal("hide");
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