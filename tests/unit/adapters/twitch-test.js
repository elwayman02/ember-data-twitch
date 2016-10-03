import { moduleFor, test } from 'ember-qunit';
import initTwitchConfig from '../../helpers/init-twitch-config';

moduleFor('adapter:twitch', 'Unit | Adapter | twitch', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo'],
  beforeEach() {
    initTwitchConfig();
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
