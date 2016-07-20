import Ember from 'ember';

const { Service } = Ember;

// const menuLink = EmberObject.extend({
//   routeName: null,
//   title: null,
//   isActive: null,
// })

export default Service.extend({
  activeTopLevelRoute: null,

  menuLinks: [
    { routeName: 'videos', title: 'Videos' },
    { routeName: 'blocks', title: 'Blocks' },
    { routeName: 'channels', title: 'Channels' },
    { routeName: 'chats', title: 'Chats' },
    { routeName: 'follows', title: 'Follows' },
    { routeName: 'games', title: 'Games' },
    { routeName: 'ingests', title: 'Ingests' },
    { routeName: 'searches', title: 'Searches' },
    { routeName: 'streams', title: 'Streams' },
    { routeName: 'subscriptions', title: 'Subscriptions' },
    { routeName: 'teams', title: 'Teams' },
    { routeName: 'users', title: 'Users' }
  ]
});
