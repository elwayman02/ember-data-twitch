import TwitchAdapter from 'ember-data-twitch/adapters/twitch';


export default TwitchAdapter.extend({

  pathForType(/* modelName */) {
    return 'feed';
  }

});
