import { moduleFor, test } from 'ember-qunit';
import TwitchConfig from 'ember-data-twitch/configuration';

let adapter;
let message;
let TEST_CLIENT_ID = 'test_client_id';

moduleFor('adapter:twitch', 'Unit | Adapter | twitch root', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('setting a `clientID` during init', function(assert) {
  message = 'clientID is read from the adapter';
  TwitchConfig.load({ clientID: '' });
  adapter = this.subject({ clientID: TEST_CLIENT_ID });
  adapter.init();

  assert.equal(adapter.clientID, TEST_CLIENT_ID, message);

  message = 'clientID is read from the addon config if not found on the adapter';
  adapter.set('clientID', '');
  TwitchConfig.load({ clientID: TEST_CLIENT_ID });
  adapter.init();

  assert.equal(adapter.clientID, TEST_CLIENT_ID, message);

  message = 'an error is thrown when no clientID is set';
  TwitchConfig.load({ clientID: '' });
  adapter.set('clientID', '');

  assert.throws(
    () => { adapter.init(); },
    message
  );
});

test('headers', function(assert) {
  message = 'The `Client-ID` header is set from the `clientID` property';
  TwitchConfig.load({ clientID: TEST_CLIENT_ID });
  adapter = this.subject();

  assert.equal(adapter.headers['Client-ID'], TEST_CLIENT_ID, message);
});
