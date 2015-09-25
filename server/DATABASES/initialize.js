var Q = require("q"),
    fs = require("fs"),
    path = require("path"),
    NANO = require(process.env.APP_NANO),
    DB_USERS = NANO.use(process.env.APP_DB_USERS);

module.exports = function(_callback) {


    var does_db_exist = function(db) {
        var deferred = Q.defer();

        NANO.db.create(db, function(err, body) {
            if (!err) {
                deferred.resolve();
            } else if (err.statusCode === 412) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;

    }

    var collect_users_db_views = function(db) {
        var deferred = Q.defer();

        var views_object = {};

        var view_list_local = require(path.join(__dirname, db, "views"));
        var view_list = [];

        for (var i = 0; i < view_list_local.length; i++) {
            view_list.push("_design/" + view_list_local[i]);
            try {
                views_object[view_list[i]] = require(path.join(__dirname, db, "views", view_list_local[i]));
            } catch (err) {}
        }

        var result_views = [];

        NANO.use(db).fetch({
            keys: view_list
        }, function(err, body) {
            if (!err) {
                body.rows.forEach(function(row) {
                    if (row.value && row.doc) {
                        if (!views_object[row.key]) {
                            row.doc._deleted = true;
                            result_views.push(row.doc);
                        } else {
                            var _rev = row.value.rev;
                            row.value = views_object[row.key];
                            row.value._rev = _rev;
                            result_views.push(row.value);
                        }
                    } else {
                        if (views_object[row.key]) {
                            result_views.push(views_object[row.key]);
                        }
                    }
                });
                deferred.resolve(result_views);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    var sync_users_db_views = function(db, views) {
        var deferred = Q.defer();
        NANO.use(db).bulk({
            docs: views
        }, function(err, body) {
            if (!err) {
                for (var i = 0; i < body.length; i++) {
                    if (!body[i].ok) {
                        deferred.reject(body[i]);
                    }
                }
                deferred.resolve();
            } else {
                deferred.reject(err);
            }
        })

        return deferred.promise;
    }


    does_db_exist(process.env.APP_DB_USERS)
        .then(function() {
            return collect_users_db_views(process.env.APP_DB_USERS);
        })
        .then(function(views) {
            return sync_users_db_views(process.env.APP_DB_USERS, views);
        })
        .then(function() {
            _callback(null, "We are good to go");
        })
        .catch(function(err) {
            _callback(err);
        });

}