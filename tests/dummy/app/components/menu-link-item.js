import Component from 'ember-component';
import layout from '../templates/components/menu-link-item';


export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['c-menu-link-item', 'u-relative'],
  classNameBindings: ['isActive'],

  routeName: null,
  title: null
});
