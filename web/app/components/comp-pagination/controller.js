/**
 * Expects list to be given to the component - Array of elements to be paginated
 * Expects eps to be given to the component - Elements per site (How many elements are to be visible pr page?) Defaults to 10
 * Does not expect cp to be set - cp (Current page) will default to 1 if not set
 * Does not expect mp(Max pages) to be set - Defaults to 6 (How many pages to toggle)
 * does not expect first to be set - Defaults to true (Go to first page)
 * does not expect prev to be set - Defaults to true (Go to prev page)
 * does not expect next to be set - Defaults to true (Go to next page)
 * does not expect last to be set - Defaults to true (Go to last page)
 * Expects begin to be given to the component - This is a variable to help index model - Where to start in array given
 * Example: 
 *  <comp-pagination
 *  list=bugs
 *  eps=20
 *  cp=2
 *  mp=5
 *  first=false
 *  prev=false
 *  next=true
 *  last=true>
 *  </comp-pagination>
 */
var APP = angular.module("APP");
APP.directive("compPagination", [function() {
    return {
        templateUrl: "components/comp-pagination/template.html",
        scope: {
            list: "=",
            eps: "=",
            cp: "=",
            mp: "=",
            begin: "=",
            first: "=",
            prev: "=",
            next: "=",
            last: "="
        },
        controller: ["$scope", function($scope) {
            if (!$scope.list)
                $scope.list = [];
            if (!$scope.eps)
                $scope.eps = 10;
            if (!$scope.cp)
                $scope.cp = 1;
            if (!$scope.mp)
                $scope.mp = 6;
            $scope.first = $scope.first === true;
            $scope.first_link = 1;
            $scope.prev = $scope.prev === true;
            $scope.prev_link = 1;
            $scope.next = $scope.next === true;
            $scope.next_link = 1;
            $scope.last = $scope.last === true;
            $scope.last_link = 1;
            if (!$scope.begin)
                $scope.begin = 0;


            //This is the elements on the current page calculated inside $scope.$watch
            $scope.current_elements = [];

            //How many pages are visible in total
            $scope.pages = [];

            $scope.$watch("list.length", function(v) {
                if (v > 0)
                    calc_pages();
            });

            var calc_pages = function() {
                //Calculates how many pages exists in total
                var pages = Math.ceil($scope.list.length / $scope.eps);
                if ($scope.cp > pages) {
                    $scope.cp = pages;
                }
                if ($scope.cp < 1)
                    $scope.cp = 1;

                //Resetting pagination
                $scope.pages = [];

                //Setting lower bound
                var lower_bound = $scope.cp - Math.floor($scope.mp / 2);
                if (lower_bound < 1)
                    lower_bound = 1;

                //Setting upper bound
                var upper_bound = lower_bound + $scope.mp;
                if (upper_bound > pages) {
                    upper_bound = pages + 1;
                }
                for (var i = lower_bound; i < upper_bound; i++) {
                    $scope.pages.push(i);
                }

                var difference = Math.abs(upper_bound - lower_bound - $scope.mp);
                if (difference) { //Is difference > 0
                    var new_lower_bound = lower_bound - difference;
                    if (new_lower_bound >= 0) {
                        for (i = lower_bound - 1; new_lower_bound - 1 < i; i--) {
                            $scope.pages.unshift(i);
                        }
                    }
                }

                $scope.begin = $scope.cp * $scope.eps - $scope.eps;
                $scope.prev_link = $scope.cp - 1;
                $scope.next_link = $scope.cp + 1;
                $scope.last_link = pages;
                if ($scope.prev_link < 1)
                    $scope.prev_link = 1;
                if ($scope.next_link > $scope.last_link)
                    $scope.next_link = $scope.last_link;
            };
        }]
    };
}]);