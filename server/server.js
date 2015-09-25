require("./config.js");
require("./settings.js");
require(process.env.APP_DATABASE_INITIALIZE)(function(err, result) {
    if (!err) {

        var http = require("http"),
            express = require("express"),
            app = require("express")(),
            bodyParser = require('body-parser'),
            session = require("express-session"),
            uuid = require("node-uuid"),
            cookieParser = require("cookie-parser"),
            passport = require("passport");


        require("./AUTH");

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


        app.use(require("./router.js"));

        http.createServer(app).listen(8080);

    } else {
        console.log("FAILED");
        console.log(err);
    }
});