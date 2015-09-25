module.exports.get_zero_time = function() {
    var date = new Date();
    var offset = date.getTimezoneOffset() * 60 * 1000;
    return date.getTime() + offset;
}