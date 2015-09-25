exports._id = "_design/client";
exports._rev = undefined;
exports.language = "javascript";
exports.views = {
    find_user: {
        map: "" + function(doc) {
            if (doc.type === "profile") {
                emit(doc._id, doc);
            }
        }
    }
}