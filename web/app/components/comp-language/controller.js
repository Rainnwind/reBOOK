/**
 * Expects base to be given to the component - String of base text.
 * Example: 
 *  <comp-language base="I'm your base that will be default for all languages until translated">
 *  </comp-language>
 */
var APP = angular.module("APP");
APP.directive("compLanguage", [function() {
    return {
        templateUrl: "components/comp-language/template.html",
        replace: true,
        scope: {
            base: "@"
        },
        controller: ["$scope", "_language", "$sce", "_user", function($scope, _language, $sce, _user) {
            _language.check_translation($scope.base);
            $scope._language = _language;
            $scope._user = _user.user;

            $scope.$watch("_language.current_language", function() {
                _language.check_translation($scope.base);
            });

            $scope.open_translation = function($event) {
                if ($($event.target).hasClass("admin-tool-gear")) {
                    alert("OPEN THE FUCKER123");
                }
            };

            $scope.trust_html = function(translation) {
                return $sce.trustAsHtml(translation + '<li class="fa fa-cog admin-tool-gear"></li>');
            };
        }]
    };
}]);