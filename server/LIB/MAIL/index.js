require("../../config");
var mandrill = require('mandrill-api/mandrill'),
    mandrill_client = new mandrill.Mandrill(process.env.APP_MANDILL_API_KEY),
    ejs = require("ejs");

module.exports.email_confirmation = function(user) {
    var config = require("./config");
    var template = ejs.compile(require("./templates").email_confirmation);
    var message = config
        .set_html(template(user))
        .set_subject("Welcome to reBOOK")
        .add_to(user.email, user.first_name + " " + user.last_name, "to")
        .get_template();


    mandrill_client.messages.send({
        "message": message,
        "async": false,
        "ip_pool": null,
        "send_at": null
    }, function(result) {
        console.log(result);
    }, function(err) {
        console.log(err);
    });
}