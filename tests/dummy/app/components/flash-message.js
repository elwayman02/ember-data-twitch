import Component from 'ember-component';
import computed from 'ember-computed';
import run from 'ember-runloop';
import layout from '../templates/components/flash-message';

const { readOnly } = computed;
const { next, cancel } = run;


export default Component.extend({
  layout,
  classNames: ['c-flash-message', 'o-content-box'],

  classNameBindings: ['isActive', 'isExiting', 'colorClassName'],

  content: null,
  isActive: false,
  // shadowDepth: 3,


  exit() {
    this.set('content.exiting', true);
  },


  isExiting: readOnly('content.exiting'),

  colorClassName: computed('content.type', {
    get() {
      const contentType = this.get('content.type');

      return {
        danger: 'c-flash-message--danger',
        warning: 'c-flash-message--warning',
        success: 'c-flash-message--success',
        info: 'c-flash-message--info'
      }[contentType];
    }
  }),


  didInsertElement() {
    this._super(...arguments);

    // Very shortly after a message is created, add the "active"
    // class to it, so that we can use CSS animations for
    // the entry transition
    debugger;
    this._applyActiveClass = next(() => this.set('isActive', true));
  },

  willDestroyElement() {
    this._super(...arguments);

    // prevent leaking
    this._destroyFlashMessage();

    // To be thorough, we will cancel any queued
    // task to add the "active" class (see: didInsertElement)
    if (this._applyActiveClass) {
      cancel(this._applyActiveClass);
    }
  },


  _destroyFlashMessage() {
    const flashMessage = getWithDefault(this, 'content', false);

    if (flashMessage && typeof flashMessage.destroyMessage === 'function') {
      flashMessage.destroyMessage();
    }
  }

});
