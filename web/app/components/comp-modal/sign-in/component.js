import Ember from 'ember';

import notificationMix from "../../../mixins/notifications";

import requestMix from "../../../mixins/request";
export default Ember.Component.extend(notificationMix, requestMix, {

    classNames: ["sign-in"],
    store: Ember.inject.service(),
    email: "rane@eriksen.be",
    password: "Re72631307",
    remember_me: false,

    auth_callback: function(platform, success, _this) {
        alert("I'm there!");
    },

    actions: {
        sign_in: function() {
            var _this = this;
            _this.GET("auth/local", {
                    email: _this.get("email"),
                    password: _this.get("password"),
                    remember_me: _this.get("remember_me")
                })
                .then(function(result) {
                    _this.set("email", "");
                    _this.set("password", "");
                    _this.set("remember_me", false);
                    _this.ALL_RESPONSE(result);
                    _this.SUCCESS("Collecting your profile");
                    return _this.get("store").findRecord("user", "user");
                })
                .then(function(user) {
                    _this.SUCCESS("Welcome back " + user.get("first_name") + " " + user.get("last_name"));
                    _this.set("user", user);
                })
                .catch(function(err) {
                    _this.CATCH_RESPONSE(err);
                });
        },
        social_signin: function(href) {
            var _this = this;
            var width = 1000;
            var height = 700;
            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            var auth_window = window.open(href, "_blank", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
            window._auth_callback = function(platform, success) {
                if (success) {
                    _this.SUCCESS("Signed you in via " + platform + "!");
                    _this.SUCCESS("Collecting your profile");
                    _this.get("store").findRecord("user", "user")
                        .then(function(user) {
                            _this.set("user", user);
                            _this.SUCCESS("Welcome back " + user.get("first_name") + " " + user.get("last_name"));
                        })
                        .catch(function(err) {
                            _this.CATCH_RESPONSE(err);
                        });
                } else {
                    _this.ERROR("Failed to sign you in via " + platform);
                }
                auth_window.close();
            }
        }
    }
});