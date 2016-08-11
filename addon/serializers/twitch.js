import Ember from 'ember';
import EmberString from 'ember-string';
import JSONAPISerializer from 'ember-data/serializers/json-api';
import Inflector from 'ember-inflector';

const { isPresent } = Ember;
const { inflector } = Inflector;
const { underscore, camelize, singularize } = EmberString;


export default JSONAPISerializer.extend({
  primaryKey: '_id',

  normalizeCase(string) {
    return camelize(string);
  }

  _resolveType(modelName) {
    return inflector.pluralize(modelName.replace('twitch-', ''));
  },

  _extractId(resourceHash) {
    return resourceHash[this.get('primaryKey')];
  },

  _extractAttributes(modelClass, resourceHash, serializer) {
    const attributes = {};

    modelClass.eachAttribute((attributeName) => {
      const normalizedKey = this.normalizeCase(attributeName);

      debugger;
      attributes[serializer.keyForAttribute(attributeName)] = resourceHash[normalizedKey];
    });

    return attributes;
  },

  _extractRelationships(modelClass, resourceHash) {
    const relationships = {};

    modelClass.eachRelationship((relationshipName, { kind, type, options }) => {
      let data = {};

      if (options.async) {
        const suffix = kind === 'hasMany' ? 'Ids' : 'Id';
        const key = `${singularize(relationshipName)}${suffix}`;
        const normalizedKey = this.normalizeCase(key);

        data = this._buildRelationships(type, resourceHash[normalizedKey], (elem) => elem);

      } else {
        const normalizedRelName = this.normalizeCase(relationshipName);

        data = this._buildRelationships(type, resourceHash[normalizedRelName], (elem) => elem.id);
      }

      if (isPresent(data)) {
        relationships[this.keyForRelationship(relationshipName)] = { data };
      }
    });

    return relationships;
  },


  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    return this._super(...arguments);
  },

  /**
   * normalize a find-record payload from the server into a JSON-API Document.
   * @see: http://jsonapi.org/format/#document-structure
   *
   * For single objects returned by the Twitch API, it seems that we'll want to
   * separate out the _id, the links, and hashes keyed by other model names, and then
   * treat everything else as attributes.
   * @see: https://github.com/justintv/Twitch-API/blob/master/v3_resources/videos.md#example-response
   */
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    const documentHash = { data: { attributes: {}, relationships: {} }, included: [] };
    const type = this._resolveType(primaryModelClass.modelName);

    documentHash.data.type = type;
    documentHash.data.id = payload._id;
    documentHash.data.attributes = this._extractAttributes(modelClass, payload, this);
    documentHash.data.relationships = this._extractRelationships(modelClass, payload);

    return this._super(...arguments);
    // return this._super(store, primaryModelClass, documentHash, id, requestType);
  },

  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    const documentHash = { data: [], included: [] };
    const type = this._resolveType(primaryModelClass.modelName);

    const dataItems = payload[type] || [];  // for example, we're searching in an object that looks like "{ videos: ... }"

    dataItems.forEach(item => {
      documentHash.data.push({
        type,
        id: this._extractId(item),
        attributes: this._extractAttributes(primaryModelClass, item, this),
        // links: {},
        relationships: this._extractRelationships(primaryModelClass, item);
      });
    });

    return this._super(...arguments);
    // return this._super(store, primaryModelClass, documentHash, id, requestType);
  },

  keyForAttribute(key) {
    return underscore(key);
  }
});
