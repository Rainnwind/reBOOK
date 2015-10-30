var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var languageSchema = new Schema({

        base: { //English language is default for reBOOK
            type: String,
            required: true,
            unique: true,
            index: true
        },

        arabic: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        bulgarian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        catalan: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        chinese: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        croatian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        czech: {
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

        dutch: {
            type: String,
            required: false,
            unique: false,
            index: true
        },


        english: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        estonian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        finnish: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        french: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        german: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        greek: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        hebrew: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        hindi: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        hungarian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        icelandic: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        indonesian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        italian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        japanese: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        korean: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        latvian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        lithuanian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        malay: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        norwegian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        persian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        polish: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        portuguese: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        romanian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        russian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        serbian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        slovak: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        slovenian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        spanish: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        swedish: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        thai: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        turkish: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        ukrainian: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        urdu: {
            type: String,
            required: false,
            unique: false,
            index: true
        },

        vietnamese: {
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