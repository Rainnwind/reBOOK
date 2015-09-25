import Ember from 'ember';
import ScrollMixin from '../../../mixins/scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll');

// Replace this with your real tests.
test('it works', function(assert) {
  var ScrollObject = Ember.Object.extend(ScrollMixin);
  var subject = ScrollObject.create();
  assert.ok(subject);
});
