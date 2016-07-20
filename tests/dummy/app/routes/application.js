import Ember from 'ember';
import injectService from 'ember-service/inject';

const { Route } = Ember;


export default Route.extend({
  SidenavService: injectService('sidenav'),

  actions: {
    authenticate() {
      // TODO: Implement -- here, I'm thinking it would just be calling an `authenticate`
      // method from the addon's session service
    },

    willTransition(transition) {
      const activeTopLevelRoute = transition.targetName.split('.')[0];
      this.get('SidenavService').set('activeTopLevelRoute', activeTopLevelRoute);
    }
  }
});
