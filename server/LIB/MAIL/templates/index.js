var fs = require("fs"),
    path = require("path");

module.exports.email_confirmation = fs.readFileSync(path.join(__dirname, "./email_confirmation.html"), "UTF-8");