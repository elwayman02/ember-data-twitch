import Component from 'ember-component';
import layout from '../templates/components/x-card';

export default Component.extend({
  layout,
  classNames: ['c-card', 'o-widget-box'],

  title: null
});
