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


  /**
   * normalize a payload from the server into a JSON-API Document, specifying
   * 'data' as a root key name for the returned hash
   * @see: http://jsonapi.org/format/#document-resource-objects
   */
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    // ❓❓❓: Is there a good way to detect an invalid SINGULAR response at this point? Or are we certain to be okay if we get here?
    const documentHash = { data: this._makeDocumentDataHash(primaryModelClass, payload) };

    return this._super(store, primaryModelClass, documentHash, id, requestType);
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

    return this._super(store, primaryModelClass, documentHash, id, requestType);
  }
});
