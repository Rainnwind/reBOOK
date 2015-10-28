module.exports = function(_request, _response, _next) {
    if (_request.isAuthenticated() && _request.user.is_admin) {
        return _next();
    }
    _response.status(401).send('Unauthorized. Redirecting to <a href="/">reBOOK</a> in <b id="timer">5</b> seconds\
        <script type="text/javascript">\
            function countDown() {\
                setTimeout(function() {\
                    var timer = document.getElementById("timer");\
                    var time = parseInt(timer.innerHTML);\
                    time--;\
                    timer.innerHTML = time;\
                    if (time === 0) {\
                        window.location = "/";\
                    } else {\
                        countDown();\
                    }\
                }, 1000);\
            }\
            countDown();\
        </script>'
        );
}