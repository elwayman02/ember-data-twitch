import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/icon-button';

export default Component.extend({
  tagName: 'button',
  layout,

  classNames: ['c-button', 'c-button--icon-button'],
  classNameBindings: ['tapTargetSizeClass'],

  iconURL: null,
  stroke: 'currentColor',
  strokeWidth: '0.125em',
  iconWidth: '75%',
  iconHeight: '75%',
  fill: 'currentColor',
  size: 'md',

  tapTargetSizeClass: computed('size', {
    get() {
      const size = (this.get('size') || 'md').toLowerCase();

      return {
        sm: 'o-tap-target--sm',
        small: 'o-tap-target--sm',
        md: 'o-tap-target--md',
        medium: 'o-tap-target--md',
        lg: 'o-tap-target--lg',
        large: 'o-tap-target--lg'
      }[size];
    }
  })

});
