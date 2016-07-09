import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://api.twitch.tv',
  namespace: 'kraken',
  dataType: 'jsonp',

  ajaxOptions() {
    let hash = this._super.call(this, ...arguments);
    hash.data = hash.data || {};
    hash.dataType = this.get('dataType');
    hash.traditional = true;
    return hash;
  }
});
