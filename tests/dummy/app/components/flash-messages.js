import Component from 'ember-component';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';
import layout from '../templates/components/flash-messages';


export default Component.extend({
  layout,
  flashMessages: injectService(),

  classNames: ['c-flash-messages'],
  classNameBindings: ['positionClass'],

  verticalPos: 'bottom',
  horizontalPos: 'right',

  /**
   * ember-cli-flash expects flash messages to be ordered
   * from top to bottom. Since toasts come up from the bottom,
   * we need to reverse the order so that the newest message
   * is on the bottom
   */
  mostRecentMessages: computed('flashMessages.arrangedQueue.[]', {
    get() {
      return this.get('flashMessages.arrangedQueue').reverse();
    }
  }),

  positionClass: computed('verticalPos', 'horizontalPos', {
    get() {
      let { verticalPos, horizontalPos } = this.getProperties('verticalPos', 'horizontalPos');

      verticalPos = ['bottom', 'top'].indexOf(verticalPos.toLowerCase()) === -1 ? 'bottom' : verticalPos;
      horizontalPos = ['left', 'right'].indexOf(horizontalPos.toLowerCase()) === -1 ? 'right' : horizontalPos;

      if (verticalPos === 'bottom') {
        return horizontalPos === 'left' ? 'c-flash-messages--bottom-left' : 'c-flash-messages--bottom-right';
      }

      return horizontalPos === 'left' ? 'c-flash-messages--top-left' : 'c-flash-messages--top-right';
    }
  })

});
