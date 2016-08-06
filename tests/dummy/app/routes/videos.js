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
      searchResults: this.get('VideosPageService').videos
    };
  },

  actions: {
    findById(id) {
      // return this
      //   .get('TwitchAPIService').find(id)
      //   .catch(error => {
      //     debugger;
      //   });
      return this.get('store')
        .findRecord('twitch-video', id)
        .then(res => {
          this.get('VideosPageService').set('searchResults', res);
        })
        .catch(({ errors }) => {
          // server-side error message
          this.set('currentModel.videoIdToSearch', '');
          this.get('flashMessages').danger(`${errors[0].detail}`);
        });

    },

    getForChannel(channelId) {
      const TwitchAPIService = this.get('TwitchAPIService');

      TwitchAPIService.set('modelKey', 'channel');

      return TwitchAPIService.findAll('channels', channelId)
      // return this
      //   .get('TwitchAPIService')
      //   .find('twitch-video', channelId);
    }
  }

});
