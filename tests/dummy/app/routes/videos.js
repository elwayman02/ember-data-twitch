import Route from 'ember-route';
import injectService from 'ember-service/inject';

export default Route.extend({
  VideosPageService: injectService('videos-page'),

  model() {
    return {
      videoIdToSearch: null,
      channelIdToSearch: null,
      searchResults: this.get('VideosPageService').videos
    };
  },

  actions: {
    findById(id) {
      debugger;
      return this.store.findRecord('twitch-video', id);
    },

    getForChannel(channelId) {
      return this.store.findRecord('twitch-video', channelId);
    }
  }

});
