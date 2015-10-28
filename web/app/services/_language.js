var APP = angular.module("APP");

APP.factory("_language", ["_load", "_notifications", function(_load, _notifications) {
    return {
        //Available to all
        current_language: "english",
        avail_languages: {
            danish: "Dansk",
            english: "English"
        },
        languages: [],
        translate_language: undefined,
        visual_language: function() {
            return this.current_language.charAt(0).toUpperCase() + this.current_language.slice(1);
        },
        change_language: function(language) {
            this.current_language = language.toLowerCase();
        },
        check_translation: function(base) {
            var _this = this;
            var _current_language = _this.current_language;
            if (!_this[base])
                _this[base] = {
                    base: base
                };
            if (!_this[base][_current_language]) {
                _this[base][_current_language] = base;
                _load.get("/api/open/language/" + _current_language, {
                        base: base
                    })
                    .then(function(result) {
                        _this[base][_current_language] = result.data.translation || base;
                    })
                    .catch(function(err) {
                        console.trace(err);
                        _notifications.handle_error(err.data.notifications);
                    });
            }
        },
        //Admin material
        get_languages: function() {
            var _this = this;
            if (_this.languages.length === 0) {
                _load.get("/api/admin/language")
                    .then(function(result) {
                        _this.languages = result.data.languages;
                    })
                    .catch(function(err) {
                        console.trace(err);
                        _notifications.handle_error(err.data.notifications);
                    });
            }
        },
        save_language: function(language) {
            return _load.put("/api/admin/language", language)
                .then(function(result) {
                    _notifications.handle_success(result.data.notifications);
                })
                .catch(function(err) {
                    _notifications.handle_error(err.data.notifications);
                });
        },
        set_translation_language: function(base) {
            var _this = this;
            var _current_language = _this.current_language;
            for (var key in _this.avail_languages) {
                if (_this.avail_languages.hasOwnProperty(key)) {
                    _this.current_language = key;
                    _this.check_translation(base);
                }
            }
            _this.translate_language = _this[base];
            _this.current_language = _current_language;
        }
    };

}]);