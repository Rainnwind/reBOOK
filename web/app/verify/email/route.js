import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        console.log("id: " + params.id);
        console.log("token: " + params.token);

    }
});
