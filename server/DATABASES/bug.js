var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    sha3 = require("sha3"),
    uuid = require("uuid"),
    mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var bugSchema = new Schema({

        name: {
            type: String,
            required: false,
            unique: false,
            index: false
        },

        email: {
            type: String,
            required: false,
            unique: false,
            index: false,
            //E-mail should always be lower case for searching purpose
            validate: {
                //Either the email should be empty or it should be valid - Nothing in between
                validator: function(email) {
                    if (!email)
                        return true;
                    return mailPattern.test(email);
                },
                message: "'{VALUE}' is an invalid e-mail"
            },
            set: function(email) {
                return email.toLowerCase();
            }
        },

        report: {
            type: String,
            required: true,
            unique: false,
            index: false,
            trim: true,
        },

        contact_later: {
            type: Boolean,
            required: false,
            unique: false,
            index: false
        },

        display_on_site: {
            type: Boolean,
            required: false,
            unique: false,
            index: false
        },

        created_by: {
            type: Schema.Types.ObjectId,
            required: false,
            unique: false,
            index: true
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
            default: new Date()
        }
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
 * Setting message for empty report
 */
bugSchema.paths.report.validators[0].message = "{PATH} cannot be empty";

var Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;