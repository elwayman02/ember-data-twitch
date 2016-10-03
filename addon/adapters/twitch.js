import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Inflector from 'ember-inflector';
import TwitchConfig from 'ember-data-twitch/configuration';

let { inflector } = Inflector;

export default JSONAPIAdapter.extend({
  host: 'https://api.twitch.tv',
  namespace: 'kraken',
  defaultSerializer: '-twitch',
  pluralizePath: true,
  clientID: '',

  init() {
    this._super(...arguments);

    this._initHeaders();
  },

  headers: {
    Accept: 'application/vnd.twitchtv.v3+json',
    'Client-ID': TwitchConfig.clientID
  },

  /**
   * Determines a path for a given type
   *
   * By default, we'll aim to return camelized, plurailzed forms of the model name,
   * as that's currently the Twitch API's most common pattern. Some resources differ,
   * however, and these cases can be handled by local overrides.
   */
  pathForType(modelName) {
    let baseName = modelName.replace('twitch-', '');

    return this.get('pluralizePath') ? inflector.pluralize(baseName) : baseName;
  },

  dataForRequest() {
    let data = this._super(...arguments) || {};
    return data;
  },


  /**
   * Currently, `ajaxOptions` is still the only place to alter
   * the `dataType` request parameter
   * @see: https://github.com/emberjs/data/pull/4357
   */
  ajaxOptions() {
    let hash = this._super(...arguments);
    hash.dataType = this.get('dataType');

    return hash;
  },

  _initHeaders() {
    this.clientID = this.clientID ? this.clientID : TwitchConfig.clientID;

    if (!this.clientID) {
      throw new Error(
        'This adapter requires a `clientID` to be set before using the Twitch API ' +
        'You can define a root `clientID` in the `ENV[\'ember-data-twitch\']` hash of `config/environment.js`'
      );
    }

    this.headers['Client-ID'] = this.clientID;
  }
});
