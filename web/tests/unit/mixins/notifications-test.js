import Ember from 'ember';
import NotificationsMixin from '../../../mixins/notifications';
import { module, test } from 'qunit';

module('Unit | Mixin | notifications');

// Replace this with your real tests.
test('it works', function(assert) {
  var NotificationsObject = Ember.Object.extend(NotificationsMixin);
  var subject = NotificationsObject.create();
  assert.ok(subject);
});
