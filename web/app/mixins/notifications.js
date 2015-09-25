import Ember from 'ember';

export default Ember.Mixin.create({
    store: Ember.inject.service(),

    ERROR: function(msg, id) {
        this.get("store").createRecord("system-notification", {
            id: id || new Date().getTime(),
            message: msg,
            type: "ERROR"
        });
    },
    SUCCESS: function(msg, id) {
        this.get("store").createRecord("system-notification", {
            id: id || new Date().getTime(),
            message: msg,
            type: "SUCCESS"
        });
    },
    INFO: function(msg, id) {
        this.get("store").createRecord("system-notification", {
            id: id || new Date().getTime(),
            message: msg,
            type: "INFO"
        });
    },

    ALL_RESPONSE: function(response) {
        var notifications = response["system-notifications"];
        if (!notifications)
            return;
        var l = notifications.length;
        for (var i = 0; i < l; i++) {
            switch (notifications[i].type) {
                case "ERROR":
                    this.ERROR(notifications[i].message, notifications[i].id);
                    break;
                case "INFO":
                    this.INFO(notifications[i].message, notifications[i].id);
                    break;
                case "SUCCESS":
                    console.log(notifications[i].type, notifications[i].message, notifications[i].id);
                    this.SUCCESS(notifications[i].message, notifications[i].id);
                    break;
                default:
                    this.ERROR("Unknown error");
                    break;
            }
        }
    },

    CATCH_RESPONSE: function(response) {
        try {
            if (typeof response === "string") {
                this.ERROR(response);
            } else {
                if (!response.errors)
                    return;
                var l = response.errors.length;
                for (var i = 0; i < l; i++) {
                    this.ERROR(response.errors[i].message);
                }
            }
        } catch (err) {
            console.log(err);
            this.ERROR("Unknown error");
        }
    }
});