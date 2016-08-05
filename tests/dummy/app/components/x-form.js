import Ember from 'ember';
import Component from 'ember-component';
import layout from '../templates/components/x-form';

const { K } = Ember;


export default Component.extend({
  layout,
  tagName: 'form',
  attributeBindings: ['autocomplete', 'method', 'novalidate'],
  classNames: ['c-form'],

  autocomplete: 'on',
  novalidate: 'novalidate',
  method: 'post',

  onSubmit: null,

  init() {
    this._super(...arguments);
    this.onSubmit = typeof this.onSubmit === 'function' ? this.onSubmit : K;
  },

  submit(ev) {
    ev.preventDefault();
    this.get('onSubmit')(...arguments);
  }
});
