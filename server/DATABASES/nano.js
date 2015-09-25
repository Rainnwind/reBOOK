module.exports = require("nano")("http://" +
    process.env.APP_COUCHDB_USER + ":" +
    process.env.APP_COUCHDB_PASSWORD + "@" +
    process.env.APP_COUCHDB_HOST + ":" +
    process.env.APP_COUCHDB_PORT);