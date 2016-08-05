import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'https://api.twitch.tv',
  namespace: 'kraken',
  dataType: 'jsonp',


  dataForRequest() {
    const data = this._super(...arguments);
    return data || {};
  },

  /**
   * Currently, `ajaxOptions` is still the only place to alter
   * the `dataType` request parameter
   * @see: https://github.com/emberjs/data/pull/4357
   */
  ajaxOptions() {
    const hash = this._super(...arguments);
    hash.dataType = this.get('dataType');

    return hash;
  }
});
