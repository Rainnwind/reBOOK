var APP = angular.module("APP");
APP.directive("modalLocalSignUp", [function() {
    return {
        templateUrl: "components/modal-local-sign-up/template.html",
        link: function(scope, element) {
            var modal = $(element).find(".modal-dialog");
            $(modal).draggable({
                handle: ".modal-header"
            });
        }
    };
}]);