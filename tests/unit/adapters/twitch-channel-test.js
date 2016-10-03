import { moduleFor, test } from 'ember-qunit';
import initTwitchConfig from '../../helpers/init-twitch-config';

let actual, expected;

moduleFor('adapter:twitch-channel', 'Unit | Adapter | twitch channel', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo'],
  beforeEach() {
    initTwitchConfig();
  }
});

// Replace this with your real tests.
test('`pathForType` computes the correct Twitch API URL for the `modelName`', function (assert) {
  const adapter = this.subject();
  const modelName = 'twitch-channel';

  expected = 'channels';
  actual = adapter.pathForType(modelName);

  assert.equal(actual, expected, `path for "${modelName} resolves to ${expected}`);
});
