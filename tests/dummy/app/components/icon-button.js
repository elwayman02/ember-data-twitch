import XButton from './x-button';
import layout from '../templates/components/icon-button';

export default XButton.extend({
  layout,
  classNames: ['c-icon-button', 'u-pointer'],

  iconURL: null,
  stroke: 'currentColor',
  fill: 'currentColor',
  strokeWidth: '0.125em',
  ariaHidden: true
});
