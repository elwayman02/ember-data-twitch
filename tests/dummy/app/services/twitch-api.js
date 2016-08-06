import Service from 'ember-service';
import injectService from 'ember-service/inject';

// 📝 TODO: Experiment with this idea and see if it might be usefull
// for our dummy app
export default Service.extend({
  store: injectService(),
  modelKey: '',
  queryType: '',


  find(id) {
    const { modelKey } = this;

    return this.store.findRecord(`twitch-${modelKey}`, id);
  }
});
