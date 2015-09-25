var sha3 = require("sha3"),
    mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.is_email = function(email) {
    return mailPattern.test(email);
}

/**
 * Assumption: Email is NOT null
 */
module.exports.email_to_char = function(email) {
    email = email.toLowerCase();
    var l = email.length;
    var number = "";
    for (var i = 0; i < l; i++) {
        number += email.charCodeAt(i);
    }
    return number;
}

module.exports.hash_value = function(value) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(value);

    return value_hash.digest("hex");
}