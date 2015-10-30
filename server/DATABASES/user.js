var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    sha3 = require("sha3"),
    uuid = require("uuid"),
    mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


var userSchema = new Schema({

        is_admin: {
            type: Boolean,
            required: false,
            unique: false,
            index: true,
            set: function() {
                return false;
            }
        },

        api_keys: {
            language: {
                type: String,
                required: false,
                unique: false,
                index: false,
                default: undefined
            }
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            //E-mail should always be lower case for searching purpose
            validate: {
                validator: function(email) {
                    if (!email)
                        return false;
                    return mailPattern.test(email);
                },
                message: "'{VALUE}' is an invalid e-mail"
            },
            set: function(email) {
                return email.toLowerCase();
            }
        },

        google: {
            id: {
                type: String,
                required: false,
                unique: true,
                index: true
            },
            token: {
                type: String,
                required: false,
                unique: true,
                index: true
            }
        },

        facebook: {
            id: {
                type: String,
                required: false,
                unique: true,
                index: true
            },
            token: {
                type: String,
                required: false,
                unique: true,
                index: true
            }
        },

        first_name: {
            type: String,
            required: false,
            unique: false,
            index: false
        },

        last_name: {
            type: String,
            required: false,
            unique: false,
            index: false
        },


        password: {
            type: String,
            required: true,
            unique: false,
            index: false,
            //Encrypting password before setting the password
            set: function(password) {
                return this.encrypt_password(password);
            }
        },

        created_at: {
            type: Date,
            required: true,
            unique: false,
            index: false,
            default: Date.now
        },

        updated_at: {
            type: Date,
            required: true,
            unique: false,
            index: false,
            default: Date.now
        },

        verified_since: {
            type: Date,
            required: false,
            unique: false,
            index: false
        },
        //If not undefined, then user has been verified

        verification_code: {
            type: String,
            required: false,
            unique: true,
            index: true
        }
        //Only active when user has not been verified

    }, {
        strict: true //Only data relevant to this schema is saved
    })
    .pre("save", function(next) {
        var _now = new Date();
        if (this.isNew) {
            this.created_at = _now;

            //Generating a verification code
            this.verification_code = new mongoose.Types.ObjectId + uuid.v1() + uuid.v4();
        }
        //On every update, this variable is update to current date
        this.updated_at = _now;
        next();
    })
    .set("toJSON", {
        getters: true,
        transform: function(doc, ret, options) {
            //Values that should not be sent to client
            delete ret.password; //Sensitive information that could land in the wrong hands
            delete ret.verification_code; //Information that could land in the wrong hands
            delete ret.google; //Sensitive information that could land int the wrong hands
            delete ret.facebook; //Sensitive information that could land int the wrong hands
        }
    });

/**
 * Method to verify and set password at the same time.
 *
 * callback: Function with an err string if something is wrong otherwise all is good
 */
userSchema.methods.verify_password = function(password, confirm_password, callback) {
    //Password either not set or too short
    if (!password || password.length < 6) {
        callback("Password is too short");
    }
    //Confirm password either not set or does not match password
    else if (!confirm_password || password !== confirm_password) {
        callback("Password do not match");
    } else {
        //Success - Setting password automatically with encryption
        this.password = password;
        callback();
    }
};

userSchema.methods.encrypt_password = function(password) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(password);
    return value_hash.digest("hex");
};

userSchema.methods.compare_password = function(password) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(password);
    return value_hash.digest("hex") === this.get("password");
}


/**
 * Setting message for empty report
 */
userSchema.paths.email.validators[0].message = "'' in an invalid e-mail";


var User = mongoose.model("User", userSchema);

module.exports = User;