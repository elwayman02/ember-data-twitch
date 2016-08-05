import Ember from 'ember';

export default Ember.Route.extend({

  model({ video_id }) {
    return this.store.findRecord('twitch-video', video_id);
  }
});
