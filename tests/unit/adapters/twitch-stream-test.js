import { moduleFor, test } from 'ember-qunit';


let expected, actual;

moduleFor('adapter:twitch-stream', 'Unit | Adapter | twitch stream', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('`pathForType` computes the correct Twitch API URL for the `modelName`', function (assert) {
  const adapter = this.subject();
  const modelName = 'twitch-stream';

  expected = 'streams';
  actual = adapter.pathForType(modelName);

  assert.equal(actual, expected, `path for "${modelName} resolves to ${expected}`);
});
