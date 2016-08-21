import Service from 'ember-service';
import injectService from 'ember-service/inject';
import { task, timeout } from 'ember-concurrency';
import { or } from 'ember-computed';


// 📝 TODO: Experiment with this idea and see if it might be usefull
// for our dummy app
export default Service.extend({
  store: injectService(),
  flashMessages: injectService('flash-messages'),

  // modelKey: '',
  // queryType: '',

  _findByIdTask: task(function *(modelKey, id) {
    try {
      const results = yield this
        .get('store')
        .findRecord(`twitch-${modelKey}`, id)
        .then(results => results);

      return results;

    } catch ({ errors }) {
      this._alertOnErrors(errors);
    }
  }),

  _findAllTask: task(function *(modelKey) {
    try {
      const results = yield this.get('store').findAll(modelKey);

    } catch ({ errors }) {
      this._alertOnErrors(errors);
    }

    return results;
  }),

  queryTask: task(function *(modelKey, opts = {}) => {
    try {
      const results = yield this.get('store').query(modelKey, opts);
      return results;

    } catch ({ errors }) {
      this._alertOnErrors(errors);
    }
  });


  // TODO: Organize a parent task and just inspect that?
  isLoadingData: or(
    '_findByIdTask.isRunning',
    '_findAllTask.isRunning',
    '_queryTask.isRunning'
  ),

  findById(modelKey, id) {
    return this.get('_findByIdTask').perform(modelKey, id);
  },

  findAll(modelKey) {
    return this.get('_findAllTask').perform(modelKey);
  },

  query(modelKey, opts) {
    return this.get('_queryTask').perform(modelKey, opts);
  }

  _alertOnErrors(errors) {
    debugger;
    this.get('flashMessages').danger(`${errors[0].detail}`, {
      extendedTimeout: 420
    });
  }
});
