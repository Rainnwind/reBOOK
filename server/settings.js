/****************************************************
 *                                                  *
 *          Public configration file                *
 *                                                  *
 ****************************************************/
var path = require("path");

process.env.APP_CLIENT_FOLDER                                   = path.join(__dirname, "../web/dist");

process.env.APP_DATABASE_INITIALIZE                             = path.join(__dirname, "./DATABASES/initialize.js");
process.env.APP_NANO                                            = path.join(__dirname, "./DATABASES/nano.js");

process.env.APP_EXPRESS_REPONSE                                 = path.join(__dirname, "LIB/EXPRESS/response.js");


process.env.APP_DB_USERS                                        = "users";
process.env.APP_USERS_COUCH_PROFILE                             = path.join(__dirname, "./DATABASES/users/docs/couch/profile.js");
process.env.APP_USERS_RESPONSE_PROFILE                          = path.join(__dirname, "./DATABASES/users/docs/response/profile.js");


//AUTH
process.env.APP_LOCAL_USER                                      = path.join(__dirname, "./AUTH/local-username-password.js");

//API - APP
process.env.APP_API_PROFILE                                     = path.join(__dirname, "./LIB/APP/profile.js");
process.env.APP_API_TIME                                        = path.join(__dirname, "./LIB/APP/time.js");