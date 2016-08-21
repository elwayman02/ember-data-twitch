import Service from 'ember-service';
import injectService from 'ember-service/inject';
import { A } from 'ember-array/utils';
import { task, timeout } from 'ember-concurrency';
import { or } from 'ember-computed';


export default Service.extend({
  store: injectService(),

  searchResults: A(),


  findVideoByIdTask: task(function * (id) {
    // yield timeout(1000);

    yield this.get('store').findRecord('twitch-video', id).then(video => {
      debugger;
      const searchResults = this.get('searchResults');

      searchResults.clear();
      searchResults.pushObject(video);
    });
  }),

  findVideosByChannel: task(function * (channelId) {

  }),

  isLoadingData: or(
    'findVideoByIdTask.isRunning',
    'findVideosByChannel.isRunning'
  ),



  findVideoById(id) {
    return this.get('findVideoByIdTask').perform(id);
  },

  findVideosByChannel(channelId) {
    return this.get('findVideosByChannelTask').perform(channelId);
  }
});
