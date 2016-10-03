import TwitchConfig from 'ember-data-twitch/configuration';
import { assign } from 'ember-platform'

const TEST_DEFAULTS = {
  clientID: 'test_client_id',
  clientSecret: '',
  redirectURI: ''
};

/**
 * Test helper to set proper Twitch configuration settings for testing
 */
export default function(settings = {}) {
  TwitchConfig.load(assign({}, TEST_DEFAULTS, settings));
}
