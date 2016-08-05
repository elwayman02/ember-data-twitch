import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    this._super(...arguments);
  }
});
