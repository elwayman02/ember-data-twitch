import { moduleFor, test } from 'ember-qunit';


let actual, expected;

moduleFor('adapter:twitch', 'Unit | Adapter | twitch', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('pathForType', function (assert) {
  const adapter = this.subject();
  const modelName = 'twitch-video';

  expected = 'videos';
  actual = adapter.pathForType(modelName);

  assert.equal(actual, expected, '`twitch-` prefix is removed and model name is pluralized');
});
