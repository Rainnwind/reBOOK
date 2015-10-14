var APP = angular.module("APP");

APP.factory("_notifications", [function() {
    var _id_count = 0;
    var _notifications = [];

    var add_notification = function(message, type, id) {
        if (!id) {
            _id_count++;
            id = "no_id_" + _id_count;
        }
        _notifications.push({
            message: message,
            id: id,
            type: type
        });
    };

    var add_notifications = function(notifications) {
        var l = notifications.length;
        for (var i = 0; i < l; i++) {
            add_notification(notifications[i].message, notifications[i].type, notifications[i].id);
        }
    };

    var remove_notification = function(id) {
        var l = _notifications.length;
        for (var i = 0; i < l; i++) {
            if (_notifications[i].id === id) {
                _notifications.splice(i, 1);
                break;
            }
        }
    };

    return {
        ERROR: function(message) {
            add_notification(message, "ERROR");
        },
        SUCCESS: function(message) {
            add_notification(message, "SUCCESS");
        },
        INFO: function(message) {
            add_notification(message, "INFO");
        },
        remove: function(notification) {
            remove_notification(notification.id);
        },
        handle_success: function(notifications) {
            if (notifications) {
                add_notifications(notifications);
            }
        },
        handle_error: function(notifications) {
            if (!notifications) {
                this.ERROR("Unknown error");
            } else {
                add_notifications(notifications);
            }
        },
        list: _notifications
    };
    
}]);