import Service from 'ember-service';
import injectService from 'ember-service/inject';
import { A } from 'ember-array/utils';
import { task } from 'ember-concurrency';
import { or } from 'ember-computed';


export default Service.extend({
  store: injectService(),

  searchResults: A(),


  findVideoByIdTask: task(function * (id) {
    yield this.get('store').findRecord('twitch-video', id).then(video => {
      const searchResults = this.get('searchResults');

      searchResults.clear();
      searchResults.pushObject(video);
    });
  }),

  findVideosByChannel: task(function * () {

  }),

  isLoadingData: or(
    'findVideoByIdTask.isRunning',
    'findVideosByChannel.isRunning'
  ),



  findVideoById(id) {
    return this.get('findVideoByIdTask').perform(id);
  },
});
