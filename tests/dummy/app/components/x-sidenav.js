import Component from 'ember-component';
import { default as computed, not } from 'ember-computed';
import { isPresent } from 'ember-utils';
import { htmlSafe } from 'ember-string';
import injectService from 'ember-service/inject';
import layout from '../templates/components/x-sidenav';

const { readOnly } = computed;
const { min } = Math;


export default Component.extend({
  SidenavService: injectService('sidenav'),
  attributeBindings: ['style', 'inert'],
  layout,
  tagName: 'aside',
  classNames: ['c-sidenav'],
  handleTransitionEnd: null,

  startingTouchX: null,
  currentTouchX: null,

  inert: not('SidenavService.isVisible'),

  touchXDelta: computed('currentTouchX', {
    get() {
      const { startTouchX, currentTouchX } = this.getProperties('startTouchX', 'currentTouchX');

      if (isPresent(startTouchX) && isPresent(currentTouchX)) {
        return currentTouchX - startTouchX;
      }
    }
  }),

  activeTopLevelRoute: readOnly('SidenavService.activeTopLevelRoute'),
  menuLinks: readOnly('SidenavService.menuLinks'),

  style: computed('touchXDelta', {
    get() {
      const touchXDelta = this.get('touchXDelta');

      if (touchXDelta) {
        const translateX = min(touchXDelta, 0);

        return htmlSafe(`transform: translateX(${translateX}px)`);
      }
    }
  }),

  /**
   * Handle touch events by grabbing the `originalEvent` (that is,
   * not the one that jQuery "fixes" 😛)
   */
  touchStart({ originalEvent: event }) {
    const startTouchX = event.touches[0].pageX;

    this.set('startTouchX', startTouchX);
    this.set('currentTouchX', startTouchX);
  },

  touchMove({ originalEvent: event }) {
    const currentTouchX = event.touches[0].pageX;

    this.set('currentTouchX', currentTouchX);

    // preventDefault as soon as we know a swipe is in progress (otherwise, we'll
    // still want to enable the ability to "touch" the close button)
    if (this.get('touchXDelta') < 0) {
      event.preventDefault();
    }
  },

  touchEnd(/* { originalEvent: event } */) {
    // if the user lets go, while swiping left, treat it as a dismissal
    if (this.get('touchXDelta') < 0) {
      this.set('SidenavService.isVisible', false);
      this.set('SidenavService.isAnimatable', true);
      this.element.style.transform = '';
    }
  },

  /* ------------------------ LIFECYCLE ------------------------ */
  init() {
    this._super(...arguments);
    this._initListeners();
  },

  didInsertElement() {
    this._super(...arguments);
    this._addEventListeners();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._removeEventListeners();
  },


  /* ------------------------ HELPERS ------------------------ */
  _initListeners() {

    /**
     * When the transition for either exiting or entering the sidenav has
     * completed, we'll want to disable any further transform animations. This
     * will allow us to support touch swiping via manual translation (see: touchStart/touchMove/touchEnd)
     */
    this.handleTransitionEnd = function handleTransitionEnd(ev) {
      if (Object.is(ev.target, this.element) && ev.propertyName === 'transform') {
        this.set('SidenavService.isAnimatable', false);
      }
    }.bind(this);
  },

  _addEventListeners() {
    this.element.addEventListener('transitionend', this.handleTransitionEnd);
  },

  _removeEventListeners() {
    this.element.removeEventListener('transitionend', this.handleTransitionEnd);
  }

});
