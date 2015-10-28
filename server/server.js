require("./config.js");
require("./settings.js");


var mongoose = require("mongoose");
mongoose.connect(
    process.env.APP_MONGOOSE_DRIVER +
    process.env.APP_MONGOOSE_USER + ":" +
    process.env.APP_MONGOOSE_PASSWORD + "@" +
    process.env.APP_MONGOOSE_HOST + ":" +
    process.env.APP_MONGOOSE_PORT +
    process.env.APP_MONGOOSE_DB);
var db = mongoose.connection;
db.once("open", function() {

    var http = require("http"),
        express = require("express"),
        app = require("express")(),
        bodyParser = require('body-parser'),
        session = require("express-session"),
        uuid = require("node-uuid"),
        cookieParser = require("cookie-parser"),
        passport = require("passport");


    require(process.env.APP_AUTH);

    app.use(cookieParser(process.env.APP_SERVER_SECRET));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.APP_SERVER_SECRET,
        cookie: {
            secure: false,
            expires: false,
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(require(process.env.APP_ROUTER));
    http.createServer(app).listen(8080);

});
db.on("error", function(err) {
    console.trace(err);
});