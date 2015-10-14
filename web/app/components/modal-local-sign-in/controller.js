var APP = angular.module("APP");
APP.directive("modalLocalSignIn", [function() {
    return {
        templateUrl: "components/modal-local-sign-in/template.html",
        link: function(scope, element) {
            var modal = $(element).find(".modal-dialog");
            $(modal).draggable({
                handle: ".modal-header"
            });
        }
    };
}]);