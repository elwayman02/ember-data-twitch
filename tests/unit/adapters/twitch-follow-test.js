import { moduleFor, test } from 'ember-qunit';
import initTwitchConfig from '../../helpers/init-twitch-config';

let expected, actual;

moduleFor('adapter:twitch-follow', 'Unit | Adapter | twitch follow', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo'],
  beforeEach() {
    initTwitchConfig();
  }
});

test('`pathForType` computes the correct Twitch API URL for the `modelName`', function (assert) {
  const adapter = this.subject();
  const modelName = 'twitch-follow';

  expected = 'follows';
  actual = adapter.pathForType(modelName);

  assert.equal(actual, expected, `path for "${modelName} resolves to ${expected}`);
});
