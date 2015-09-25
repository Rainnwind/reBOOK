import Ember from 'ember';
var $ = Ember.$;

export default Ember.Mixin.create({
    init_scroller: function() {
        var _this = this;
        if (!this.touchmove_id) {
            $(document)
                .on('touchmove', function() {
                    _this._scrolled();
                });
            _this.touchmove_id = $._data($(document)[0], 'events').touchmove.length - 1;
        }
        if (!this.scroll_id) {
            $(window)
                .on('scroll', function() {
                    _this._scrolled();
                });
            _this.scroll_id = $._data($(window)[0], 'events').scroll.length - 1;
        }
    },
    reset_scroller: function() {
        /*
          Ensures to unbind scroll functions if reset_scroller is called - Only unbinds the calling component/controller
        */
        $(window).unbind("scroll", $._data($(window)[0], 'events').scroll[this.scroll_id]);
        $(document).unbind("scroll", $._data($(document)[0], 'events').touchmove[this.touchmove_id]);
        this.touchmove_id = null;
        this.scroll_id = null;
    }
});