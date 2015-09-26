var sha3 = require("sha3"),
    uuid = require("uuid"),
    mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.is_email = function(email) {
    return mailPattern.test(email);
}

/**
 * Assumption: Username is NOT null
 */
module.exports.username_to_char = function(username) {
    username = username.toLowerCase();
    var l = username.length;
    var number = "";
    for (var i = 0; i < l; i++) {
        number += username.charCodeAt(i);
    }
    return number;
}

module.exports.verification_code = function() {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(uuid.v1() + uuid.v4());
    return value_hash.digest("hex");
}

module.exports.hash_value = function(value) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(value);

    return value_hash.digest("hex");
}