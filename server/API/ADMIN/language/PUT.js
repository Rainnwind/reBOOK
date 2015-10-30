var DB_LANGUAGE = require(process.env.APP_DB_LANGUAGE);
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function(_request, _response) {
    DB_LANGUAGE.update({
        base: _request.body.base
    }, {
        $set: {
            arabic: _request.body.arabic,
            bulgarian: _request.body.bulgarian,
            catalan: _request.body.catalan,
            chinese: _request.body.chinese,
            croatian: _request.body.croatian,
            czech: _request.body.czech,
            danish: _request.body.danish,
            dutch: _request.body.dutch,
            english: _request.body.english,
            estonian: _request.body.estonian,
            finnish: _request.body.finnish,
            french: _request.body.french,
            german: _request.body.german,
            greek: _request.body.greek,
            hebrew: _request.body.hebrew,
            hindi: _request.body.hindi,
            hungarian: _request.body.hungarian,
            icelandic: _request.body.icelandic,
            indonesian: _request.body.indonesian,
            italian: _request.body.italian,
            japanese: _request.body.japanese,
            korean: _request.body.korean,
            latvian: _request.body.latvian,
            lithuanian: _request.body.lithuanian,
            malay: _request.body.malay,
            norwegian: _request.body.norwegian,
            persian: _request.body.persian,
            polish: _request.body.polish,
            portuguese: _request.body.portuguese,
            romanian: _request.body.romanian,
            russian: _request.body.russian,
            serbian: _request.body.serbian,
            slovak: _request.body.slovak,
            slovenian: _request.body.slovenian,
            spanish: _request.body.spanish,
            swedish: _request.body.swedish,
            thai: _request.body.thai,
            turkish: _request.body.turkish,
            ukrainian: _request.body.ukrainian,
            urdu: _request.body.urdu,
            vietnamese: _request.body.vietnamese
        }
    }, function(err, body) {
        if (!err) {
            _response
                ._response
                ._SUCCESS("Language updated")
                ._send();
        } else {
            _response
                ._response
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._send();
            console.trace(err);
        }
    })
};