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
                return {}
            });
    },
    actions: {
        openModal: function(modalName, model) {
            console.log(model);
            return this.render(modalName, {
                into: "application",
                outlet: "modal",
                model: model,
                controller: modalName
            });
        },
        closeModal: function() {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application',
            });
        },
        refresh_application: function() {
            this.refresh();
        }
    }
});