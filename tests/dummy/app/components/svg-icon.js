import layout from '../templates/components/svg-icon';
import Component from 'ember-component';
import computed from 'ember-computed';


export default Component.extend({
  layout,
  tagName: 'svg',

  attributeBindings: [
    'id',
    'aria-hidden',
    'version',
    'viewBox',
    'xmlns',
    'xmlnsXlink:xmlns:xlink',   // special syntax for namespaced attributes (https://github.com/emberjs/ember.js/pull/10186#discussion_r22911832)
    'x',
    'y',
    'width',
    'height',
    'stroke',
    'stroke-width',
    'fill',
    'preserveAspectRatio',
    'style'
  ],

  iconURL: null,


  // Default attributes
  version: '1.1',
  width: '1em',
  height: '1em',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  'stroke-width': '0.125em',

  /**
   * Ensure that the aria-hidden attribute is declared.
   * @see: https://github.com/WebDevStudios/wd_s/issues/168
   *
   * NOTE: We need to return `true` or `false` as strings in order for
   * the value to be explicitly assigned in the DOM (i.e: like `aria-hidden="true"`)
   */
  'aria-hidden': computed('hidden', {
    get() {
      return this.get('hidden') ? 'true' : 'false';
    }
  })
});
