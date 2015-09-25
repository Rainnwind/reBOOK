import Ember from 'ember';

export default Ember.Component.extend({
    model: undefined,
    index: 1,
    classNames: ["system-notification"],
    classNameBindings: ["model.type"],

    didInsertElement: function() {
        //bind hover effects
        console.log(this.get("model.message"));
        var _this = this;
        _this.$().fadeOut(10000 * (_this.get("index") + 1), function() {
            if (_this.$()) {
                _this.remove_notification();
            }
        });
        _this.$().mousemove(function() {
            if (_this.$()) {
                _this.$().css("opacity", "1.0").stop();
            }
        });
        _this.$().mouseleave(function() {
            if (_this.$()) {
                _this.$().fadeOut(10000 * (_this.get("index") + 1), function() {
                    _this.remove_notification();
                });
            }
        });

    },
    willDestroy: function() {
        this.remove_notification();
    },
    remove_notification: function() {
        var model = this.get("model");
        if (model && !model.get("isDeleted")) {
            model.deleteRecord();
        }
    },
    click: function() {
        this.remove_notification();
    },

    awesome_icon: Ember.computed("model.type", {
        get: function() {
            console.log(this.get("model.type"))
            var pre = "fa fa-";
            switch (this.get("model.type")) {
                case "ERROR":
                    return pre += "times";
                case "SUCCESS":
                    return pre += "check";
                case "INFO":
                    return pre += "info";
                default:
                    return pre += "times";
            }
        }
    }),

});