var http = require("http"),
    express = require("express"),
    app = express();

require("./config.js");
require("./settings.js");
app.use(require("./router.js"));

http.createServer(app).listen(8080);