import Ember from 'ember';

import notificationMix from "../mixins/notifications";
export default Ember.Route.extend(notificationMix, {
    model: function() {
        var _this = this;
        return _this.store.findRecord("user", "user")
            .then(function(user) {
                return user;
            })
            .catch(function(err) {
                undefined
            });
    }
});