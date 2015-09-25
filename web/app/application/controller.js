import Ember from 'ember';

import scrollMix from "../mixins/scroll";

var $ = Ember.$;

import requestMix from "../mixins/request";
export default Ember.Controller.extend(scrollMix, requestMix, {
    model: undefined,
    "system-notifications": Ember.computed({
        get: function() {
            return this.store.peekAll("system-notification");
        }
    }),
    scrollBefore: 0,
    init: function() {
        this.init_scroller();
    },
    _scrolled: function() { //Calculates the position of the topbar - Fixed topbar
        var scrollTop = $(window).scrollTop();
        var difference = this.get("scrollBefore") - scrollTop;

        var toptop = $("#topbar").position().top;
        var toptop_height = $("#topbar").height();

        var new_toptop = toptop + difference;
        if (new_toptop > 0) {
            new_toptop = 0;
        }
        if (new_toptop < -toptop_height) {
            new_toptop = -toptop_height;
        }
        $("#topbar").css("top", new_toptop);
        this.set("scrollBefore", scrollTop);
    }
});