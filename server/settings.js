/****************************************************
 *                                                  *
 *          Public configration file                *
 *                                                  *
 ****************************************************/
var path = require("path");

process.env.APP_CLIENT_FOLDER                                   = path.join(__dirname, "../web/dist");

process.env.APP_ROUTER                                          = path.join(__dirname, "./router.js");


process.env.APP_EXPRESS_REPONSE                                 = path.join(__dirname, "LIB/EXPRESS/response.js");
process.env.APP_EXPRESS_IS_AUTHENTICATED                        = path.join(__dirname, "LIB/EXPRESS/is_authenticated.js");


process.env.APP_DB_USERS                                        = path.join(__dirname, "./DATABASES/user.js");

//AUTH
process.env.APP_AUTH                                            = path.join(__dirname, "./AUTH/index.js");
process.env.APP_LOCAL_USER                                      = path.join(__dirname, "./AUTH/local-username-password.js");

//API - APP
process.env.APP_API_PROFILE                                     = path.join(__dirname, "./LIB/APP/profile.js");
process.env.APP_API_TIME                                        = path.join(__dirname, "./LIB/APP/time.js");

process.env.APP_API_MAIL                                        = path.join(__dirname, "./LIB/MAIL");