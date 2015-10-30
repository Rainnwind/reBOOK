var APP = angular.module("APP");
APP.directive("modalLanguage", [function() {
    return {
        templateUrl: "components/modal-language/template.html",
        controller: ["$scope", "_notifications", "_language", "_load", "_user", function($scope, _notifications, _language, _load, _user) {
            $scope._language = _language;

            $scope.translate_with_google = function($event, base, language) {
                $event.preventDefault(); //We do not want form to submet

                var current_language = $scope._language.translate_language;

                $scope.google_languages = {
                    arabic: "ar",
                    bulgarian: "bg",
                    catalan: "ca",
                    chinese: "zh_CN",
                    croatian: "hr",
                    czech: "cs",
                    danish: "da",
                    dutch: "nl",
                    english: "en",
                    estonian: "et",
                    finnish: "fi",
                    french: "fr",
                    german: "de",
                    greek: "el",
                    hebrew: "iw",
                    hindi: "hi",
                    hungarian: "hu",
                    icelandic: "is",
                    indonesian: "id",
                    italian: "it",
                    japanese: "ja",
                    korean: "ko",
                    latvian: "lv",
                    lithuanian: "lt",
                    malay: "ms",
                    norwegian: "no",
                    persian: "fa",
                    polish: "pl",
                    portuguese: "pt",
                    romanian: "ro",
                    russian: "ru",
                    serbian: "sr",
                    slovak: "sk",
                    slovenian: "sl",
                    spanish: "es",
                    swedish: "sv",
                    thai: "th",
                    turkish: "tr",
                    ukrainian: "uk",
                    urdu: "ur",
                    vietnamese: "vi"
                };



                _load.get("https://www.googleapis.com/language/translate/v2?key=" + _user.user.api_keys.language + "&target=" + $scope.google_languages[language] + "&q=" + encodeURIComponent(base))
                    .then(function(result) {
                        current_language[language] = result.data.data.translations[0].translatedText;
                    })
                    .catch(function(err) {
                        _notifications.ERROR("Failed to translate language");
                        console.trace(err);
                    });
            };
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