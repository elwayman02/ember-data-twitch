import Component from 'ember-component';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';
import layout from '../templates/components/flash-messages';


export default Component.extend({
  layout,
  flashMessages: injectService(),

  classNames: ['c-flash-messages'],

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
  })

});
