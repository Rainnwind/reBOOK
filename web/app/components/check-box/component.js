import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ["checkbox"],
    checked: false,
    label_after: "",
    label_before: "",

    click: function() {
        this.toggleProperty("checked");
    }
});