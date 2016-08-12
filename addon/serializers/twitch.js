import { isPresent } from 'ember-utils';
import { assert } from 'ember-metal/utils';
import { isEmberArray as isArray } from 'ember-array/utils';
import EmberString from 'ember-string';
import JSONAPISerializer from 'ember-data/serializers/json-api';
import Inflector from 'ember-inflector';

const { inflector } = Inflector;
const { camelize, singularize, decamelize } = EmberString;


/**
 * Base serializer for the Twicth V3 API.
 *
 * For an example single-record response, @see: https://github.com/justintv/Twitch-API/blob/master/v3_resources/videos.md#example-response
 * For an example collection response, @see: https://github.com/justintv/Twitch-API/blob/master/v3_resources/videos.md#example-response-1
 */
export default JSONAPISerializer.extend({

  /**
   * Model type as conceptualized by the server. Internally, (that is,
   * for our client-side models, this name will be prefixed with "twitch-")
   *
   * usage: override this and define in each specific model's serializer
   */
  modelType: '',

  /**
   * Converts an attribute name in the model to a key in JSON.
   *
   * The API expect compound words in snake_case, so we'll "decamelize"
   * our model names
   */
  keyForAttribute(attr /* , method */) {
    return decamelize(attr);
  },


  // _resolveType(modelName) {
  //   return inflector.pluralize(modelName);
  //   // return inflector.pluralize(modelName.replace('twitch-', ''));
  // },

  _extractId(resourceHash) {
    return resourceHash[this.get('primaryKey')];
  },

  _extractAttributes(modelClass, resourceHash /* , serializer */) {
    const attributes = {};

    modelClass.eachAttribute((attributeName) => {
      const normalizedAttributeKey = this.keyForAttribute(attributeName);

      // attributes[serializer.keyForAttribute(attributeName)] = resourceHash[normalizedKey];
      attributes[normalizedAttributeKey] = resourceHash[normalizedAttributeKey];
    });

    return attributes;
  },

  _extractRelationships(modelClass, resourceHash) {
    const relationships = {};

    modelClass.eachRelationship((relationshipName, { kind, type, options }) => {
      let data;

      if (options.async) {
        const suffix = kind === 'hasMany' ? 'Ids' : 'Id';
        const key = `${singularize(relationshipName)}${suffix}`;
        const normalizedKey = this.keyFror(key);

        data = this._buildRelationships(type, resourceHash[normalizedKey], (elem) => elem);

      } else {
        const normalizedRelName = this.keyForRelationship(relationshipName);

        data = this._buildRelationships(type, resourceHash[normalizedRelName], (elem) => elem.id);
      }

      if (isPresent(data)) {
        relationships[this.keyForRelationship(relationshipName)] = { data };
      }
    });

    return relationships;
  },


  _makeDocumentDataHash(primaryModelClass, payload) {
    return {
      type: inflector.pluralize(primaryModelClass.modelName),  // matches the client-side type name of the model
      id: payload._id,
      attributes: this._extractAttributes(primaryModelClass, payload /* this */) || {},
      relationships: this._extractRelationships(primaryModelClass, payload) || {}
    };
  },


  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    // const documentHash = { data: [], included: [] };
    // const clientType = primaryModelClass.modelName;
    // const serverType = this.get('modelType');
    // const isSingular = requestType.search(/^(:?.*Record|belongsTo)$/) > -1;
    //
    // // The server returns singular records as a flat payload
    // const root = isSingular ? payload : payload[serverType];
    //
    // // ❓❓❓: Is there a good way to detect an invalid SINGULAR response at this point? Or are we certain to be okay if we get here?
    // assert(
    //   'The root of results with multiple items must contain the pluralized model class name as a key',
    //   (isSingular || typeof root !== 'undefined')
    // );
    //
    //
    // // JSON-API expects singular records to comprise the document root
    // // (that is, we don't need a top-level "data" key)
    // if (isSingular) documentHash.data = documentHash.data[0];
    //
    // return this._super(store, primaryModelClass, documentHash, id, requestType);
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
    // const documentHash = { attributes: {}, relationships: {}, included: [] };
    // const type = this._resolveType(primaryModelClass.modelName);

    // documentHash.type = type;
    // documentHash.id = payload._id;
    // documentHash.attributes = this._extractAttributes(primaryModelClass, payload, this);
    // documentHash.relationships = this._extractRelationships(primaryModelClass, payload);
    const documentHash = this._makeDocumentDataHash(primaryModelClass, payload);
    debugger;
    // return this._super(store, primaryModelClass, documentHash, id, requestType);
    return this._super(store, primaryModelClass, { data: documentHash }, id, requestType);
  },


  /**
   * handle `findBelongsTo` responses identically to the way we handle `findRecord` responses
   */
  normalizeFindBelongsToResponse() {
    debugger;
    return this.normalizeFindRecordResponse(...arguments);
  },


  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    debugger;
    // const clientType = primaryModelClass.modelName;
    const serverType = this.get('modelType');
    const payloadData = payload[inflector.pluralize(serverType)];

    assert('The root of results with multiple items must contain an array keyed on the pluralized model class name', isArray(payloadData));

    const documentHash = { data: [], included: [] };

    // set document `type`
    documentHash.type = clientType;

    // set document `data`
    documentHash.data = payloadData.map(data => this._makeDocumentDataHash(primaryModelClass, data));


    return this._super(...arguments);
    // return this._super(store, primaryModelClass, documentHash, id, requestType);
  },

  extractErrors(store, typeClass, payload, id) {
    debugger;
    return this._super(...arguments);
  }
});
