import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  broadcastId: attr('string'),
  status: attr('string'),
  tagList: attr(),
  recordedAt: attr('string'),
  game: attr('string'),
  length: attr('number'),
  preview: attr('string'),
  url: attr('string'),
  views: attr('number'),
  broadcastType: attr('string'),

  // _links: attr('string'), // TODO: Deserialize into "links"?

  /**
   * This isn't a channel Id, but rather an object containing
   * a "name" and "display_name"
   */
  channel: attr()
});
