import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('name', { path: ':name' }, function() {
      this.route('repos', function() {
        this.route('languages', { path: ':repo' });
      });
    });
  });
});

export default Router;
