var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var languageSchema = new Schema({

        base: { //English language is default for reBOOK
            type: String,
            required: true,
            unique: true,
            index: true
        },

        english: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        danish: {
            type: String,
            required: false,
            unique: false,
            index: true
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
            default: Date.now
        }
    }, {
        strict: true //Only data relevant to this schema is saved
    })
    .pre("save", function(next) {
        var _now = new Date();
        if (this.isNew) {
            this.created_at = _now;
        }

        //On every update, this variable is update to current date
        this.updated_at = _now;
        next();
    })
    .set("toJSON", {
        getters: true,
        transform: function(doc, ret, options) {
            //Values that should not be sent to client
            delete ret.created_by; //Sensitive information that could land in the wrong hands
        }
    });

/**
 * Setting message for empty report
 */
languageSchema.paths.base.validators[0].message = "{PATH} cannot be empty";

var Language = mongoose.model("Language", languageSchema);

module.exports = Language;