import Route from 'ember-route';
import injectService from 'ember-service/inject';
import { A, isEmberArray } from 'ember-array/utils';

export default Route.extend({
  // VideosPageService: injectService('videos-page'),
  TwitchAPIService: injectService('twitch-api'),
  // flashMessages: injectService('flash-messages'),
  // activate() {
  //   this._super(...arguments);
  //
  //   this.get('TwitchAPIService').set('modelKey', 'video');
  // },

  model() {
    return {
      videoIdToSearch: null,
      channelNameToSearch: null,
      // videosPage: this.get('VideosPageService'),
      searchResults: A(),
      isLoadingData: this.get('TwitchAPIService.isLoadingData')
    };
  },

  actions: {
    findById(id) {
      return this
        .get('TwitchAPIService')
        .findById('video', id)
        .then(results => {
          this.set('currentModel.videoIdToSearch', '');
          this._fillSearchResults(results);
        })
        .catch(({ errors }) => {
          this.get('currentModel.channelNameToSearch', '');
        });
      // return this
      //   .get('VideosPageService')
      //   .findVideoById(id)
      //   .then(() => this.set('currentModel.videoIdToSearch'), '')
      //   .catch(({ errors }) => {
      //     debugger;
      //     // server-side error message
      //     this.set('currentModel.videoIdToSearch', '');
      //     this.get('flashMessages').danger(`${errors[0].detail}`, {
      //       extendedTimeout: 420
      //     });
      //   });
    },

    findAllForChannel(channelName) {
      return this
        .get('TwitchAPIService')
        .findById('channel', channelName)
        .then(channel => {
          const videos = channel.get('videos');
          this.set('currentModel.channelNameToSearch', '');
          this._fillSearchResults(videos);
        })
        .catch(({ errors }) => {
          this.get('currentModel.channelNameToSearch', '');
        });
    }
  },

  findFromFollowedChannels() {
    // 📝 TODO: Implement after setting up user authorization
  },

  _fillSearchResults(searchResponse) {
    debugger;
    const searchResults = this.get('currentModel.searchResults');
    const method = isEmberArray(searchResponse) ? 'pushObjects' : 'pushObject';

    searchResults.clear();
    searchResults[method](searchResponse);
  }

});
