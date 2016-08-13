import Ember from 'ember';
import injectService from 'ember-service/inject';

const { Route } = Ember;


export default Route.extend({
  SidenavService: injectService('sidenav'),

  model() {
    return {
      sidenav: this.get('SidenavService')
    };
  },

  actions: {
    authenticate() {
      // TODO: Implement -- here, I'm thinking it would just be calling an `authenticate`
      // method from the addon's session service
    },

    willTransition(transition) {
      const activeTopLevelRoute = transition.targetName.split('.')[0];

      this.set('SidenavService.activeTopLevelRoute', activeTopLevelRoute);
    },

    toggleSidenav() {
      const SidenavService = this.get('SidenavService');

      SidenavService.toggleProperty('isVisible');
      SidenavService.toggleProperty('isAnimatable');
    }
  }
});
