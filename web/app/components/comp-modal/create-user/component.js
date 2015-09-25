import Ember from 'ember';

import requestMix from "../../../mixins/request";
import notificationMix from "../../../mixins/notifications";
export default Ember.Component.extend(requestMix, notificationMix, {

    classNames: ["create-user"],
    store: Ember.inject.service(),
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    terms_accepted: false,

    actions: {
        create_user: function() {
            var _this = this;
            _this.POST("auth/local", {
                    first_name: _this.get("first_name"),
                    last_name: _this.get("last_name"),
                    email: _this.get("email"),
                    phone_number: _this.get("phone_number"),
                    password: _this.get("password"),
                    confirm_password: _this.get("confirm_password"),
                    terms_accepted: _this.get("terms_accepted")
                })
                .then(function(result) {
                    _this.set("first_name", "");
                    _this.set("last_name", "");
                    _this.set("email", "");
                    _this.set("phone_number", "");
                    _this.set("password", "");
                    _this.set("confirm_password", "");
                    _this.set("terms_accepted", false);
                    _this.ALL_RESPONSE(result);

                    return _this.get("store").findRecord("user", "user");
                })
                .then(function(user) {
                    _this.SUCCESS("Welcome back " + user.get("first_name") + " " + user.get("last_name"));
                    _this.set("user", user);
                })
                .catch(function(err) {
                    _this.CATCH_RESPONSE(err);
                });
        }
    }
});