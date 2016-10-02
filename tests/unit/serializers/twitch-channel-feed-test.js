import { moduleForModel, test } from 'ember-qunit';

moduleForModel('twitch-channel-feed', 'Unit | Serializer | twitch channel feed', {
  // Specify the other units that are required for this test.
  needs: ['serializer:twitch-channel-feed']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
