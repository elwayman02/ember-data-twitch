import layout from '../templates/components/svg-icon';
import Component from 'ember-component';


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
  'aria-hidden': null,  // @see: https://github.com/WebDevStudios/wd_s/issues/168
  width: '1em',
  height: '1em',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  'stroke-width': '0.125em'
});
