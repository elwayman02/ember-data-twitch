import Component from 'ember-component';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';
import layout from '../templates/components/x-sidenav';

const { readOnly } = computed;


export default Component.extend({
  layout,
  tagName: 'section',
  classNames: ['c-sidenav'],
  SidenavService: injectService('sidenav'),

  activeTopLevelRoute: readOnly('SidenavService.activeTopLevelRoute'),
  menuLinks: readOnly('SidenavService.menuLinks')
});
