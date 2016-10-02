import { moduleForModel, test } from 'ember-qunit';

moduleForModel('twitch-user', 'Unit | Serializer | twitch user', {
  // Specify the other units that are required for this test.
  needs: ['serializer:twitch-user']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
