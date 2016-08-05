import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });

  this.route('videos', function() {
    this.route('video', { path: ':video_id' });
  });

  this.route('twitch-auth');
  this.route('users');
  this.route('teams');
  this.route('subscriptions');
  this.route('streams');
  this.route('ingests');
  this.route('searches');
  this.route('games');
  this.route('follows');
  this.route('chats');
  this.route('channels');
  this.route('blocks');
  this.route('error-404');
});

export default Router;
