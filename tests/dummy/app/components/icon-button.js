// import XButton from './x-button';
import computed from 'ember-computed';
import Component from 'ember-component';
import layout from '../templates/components/icon-button';

export default Component.extend({
  layout,
  tagName: 'button',
  attributeBindings: ['disabled', 'aria-label'],

  classNames: ['c-icon-button', 'u-pointer', 'o-content-box'],
  classNameBindings: ['sizeClass'],

  disabled: false,
  'aria-label': null,
  iconURL: null,
  stroke: 'currentColor',
  fill: 'currentColor',
  strokeWidth: '0.125em',
  ariaHidden: true,
  size: 'md',

  sizeClass: computed('size', {
    get() {
      const size = this.get('size') || 'md';

      return {
        'sm': 'o-tap-target--sm',
        'md': 'o-tap-target--md',
        'lg': 'o-tap-target--lg'
      }[size.toLowerCase()];
    }
  })
});
