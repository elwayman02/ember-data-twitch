import Route from 'ember-route';
import injectService from 'ember-service/inject';

export default Route.extend({
  VideosPageService: injectService('videos-page'),
  TwitchAPIService: injectService('twitch-api'),
  flashMessages: injectService('flash-messages'),
  // activate() {
  //   this._super(...arguments);
  //
  //   this.get('TwitchAPIService').set('modelKey', 'video');
  // },

  model() {
    return {
      videoIdToSearch: null,
      channelIdToSearch: null,
      videosPage: this.get('VideosPageService')
    };
  },

  actions: {
    findById(id) {
      return this
        .get('VideosPageService')
        .findVideoById(id)
        .then(() => this.set('currentModel.videoIdToSearch'), '')
        .catch(({ errors }) => {
          debugger;
          // server-side error message
          this.set('currentModel.videoIdToSearch', '');
          this.get('flashMessages').danger(`${errors[0].detail}`, {
            extendedTimeout: 420
          });
        });
    },

    findAllForChannel(channelId) {
      const TwitchAPIService = this.get('TwitchAPIService');

      TwitchAPIService.set('modelKey', 'channel');

      return TwitchAPIService.findAll('channels', channelId)
      // return this
      //   .get('TwitchAPIService')
      //   .find('twitch-video', channelId);
    }
  },

  findFromFollowedChannels() {
    // 📝 TODO: Implement after setting up user authorization
  }

});
