var APP = angular.module("APP");

/****************************************************
 *                                                  *
 *              Defining routes                     *
 *                                                  *
 ***************************************************/
APP.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function($locationProvider, $stateProvider, $urlRouterProvider) {
    var _initialized = false;
    $urlRouterProvider
        .when("/{path:.*}", ["_user", "$state", function(_user, $state) {
            if (!_initialized) {
                _initialized = true;
                _user.get_user_silent();
            }

            return false;
        }]);

    $stateProvider
        .state("index", {
            url: "/",
            controller: "indexController",
            templateUrl: "pages/application/index/template.html",
            params: {
                contact: null
            }
        })
        .state("find", {
            url: "/find/",
            controller: "findController",
            templateUrl: "pages/application/find/template.html",
        })
        .state("sell", {
            url: "/sell/",
            controller: "sellController",
            templateUrl: "pages/application/sell/template.html"
        })
        .state("wtf", {
            url: "/wtf/",
            controller: "wtfController",
            templateUrl: "pages/application/wtf/template.html"
        })
        .state("bugs", {
            url: "/bugs/",
            controller: "bugsController",
            templateUrl: "pages/application/bugs/template.html"
        })
        .state("profile", {
            url: "/profile/",
            controller: "profileController",
            templateUrl: "pages/application/profile/template.html",
            resolve: {
                authorized: ["_user", "_notifications", "$state", "$timeout", function(_user, _notifications, $state, $timeout) {
                    return _user.get_user_silent()
                        .then(function() {
                            return true;
                        })
                        .catch(function(err) {
                            _notifications.handle_error(err.data.notifications);
                            return false;
                        });
                }]
            }
        })
        .state("profile.overview", {
            url: "overview/",
            controller: "profile/overviewController",
            templateUrl: "pages/application/profile/overview/template.html"
        })
        .state("profile.stats", {
            url: "stats/",
            controller: "profile/statsController",
            templateUrl: "pages/application/profile/stats/template.html"
        })
        .state("profile.messages", {
            url: "messages/",
            controller: "profile/messagesController",
            templateUrl: "pages/application/profile/messages/template.html"
        })
        .state("profile.books", {
            url: "books/",
            controller: "profile/booksController",
            templateUrl: "pages/application/profile/books/template.html"
        })
        .state("profile.settings", {
            url: "settings/",
            controller: "profile/settingsController",
            templateUrl: "pages/application/profile/settings/template.html"
        })
        .state("profile.wishlist", {
            url: "wishlist/",
            controller: "profile/wishlistController",
            templateUrl: "pages/application/profile/wishlist/template.html"
        });


    $locationProvider.html5Mode(true); //Removes the HASHTAG
}]);