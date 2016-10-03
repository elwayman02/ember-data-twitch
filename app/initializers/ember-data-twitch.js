import TwitchAdapter from 'ember-data-twitch/adapters/twitch';
import TwitchSerializer from 'ember-data-twitch/serializers/twitch';
import ENV from '../config/environment';
import TwitchConfig from 'ember-data-twitch/configuration';

export function initialize(/* application */) {

  // Support initializer signature from before 2.1.0
  // See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity
  let application = arguments[1] || arguments[0];
  let twitchConfig = ENV['ember-data-twitch'];

  // prefix our addon's adapter/serializer with a `-`
  application.register('adapter:-twitch', TwitchAdapter);
  application.register('serializer:-twitch', TwitchSerializer);

  TwitchConfig.load(twitchConfig);
}

export default {
  before: 'ember-data',
  name: 'ember-data-twitch',
  initialize
};
