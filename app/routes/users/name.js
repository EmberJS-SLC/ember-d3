import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.$.ajax(`https://api.github.com/users/${params.name}/repos`);
  }
});
