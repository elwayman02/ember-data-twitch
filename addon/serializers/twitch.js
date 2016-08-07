import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  modelKey: '',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    const modelKey = this.get('modelKey');



    return this._super(...arguments);
  }
});
