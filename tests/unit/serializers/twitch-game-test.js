import { moduleForModel, test } from 'ember-qunit';

moduleForModel('twitch-game', 'Unit | Serializer | twitch game', {
  // Specify the other units that are required for this test.
  needs: ['serializer:twitch-game']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
