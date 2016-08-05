import TwitchAdapter from '../adapters/twitch';
import TwitchSerializer from '../serializers/twitch';


export function initialize(/* application */) {

  // Support initializer signature from before 2.1.0
  // See http://emberjs.com/deprecations/v2.x/#toc_initializer-arity
  const application = arguments[1] || arguments[0];

  // prefix our addon's adapter/serializer with a `-`
  application.register('adapter:-twitch', TwitchAdapter);
  application.register('serializer:-twitch', TwitchSerializer);
}

export default {
  before: 'ember-data',
  name: 'ember-data-twitch',
  initialize
};
