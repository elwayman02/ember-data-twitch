import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Inflector from 'ember-inflector';
import { camelize } from 'ember-string';

const { inflector } = Inflector;


export default JSONAPIAdapter.extend({
  host: 'https://api.twitch.tv',
  namespace: 'kraken',
  dataType: 'jsonp',
  pluralizePath: true,

  /**
   * Determines a path for a given type
   *
   * By default, we'll aim to return camelized, plurailzed forms of the model name,
   * as that's currently the Twitch API's most common pattern. Some resources differ,
   * however, and these cases can be handled by local overrides.
   */
  pathForType: function(modelName) {
    const baseName = modelName.replace('twitch-', '');

    return this.get('pluralizePath') ? camelize(inflector.pluralize(baseName)) : camelize(baseName);
  },


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
