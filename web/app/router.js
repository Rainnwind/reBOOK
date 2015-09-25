import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sell');
  this.route('books');
  this.route('profile', function() {
    this.route('settings');
  });
});

export default Router;