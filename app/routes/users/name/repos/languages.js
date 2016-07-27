import Ember from 'ember';
import { entries } from 'd3-collection';

export default Ember.Route.extend({
  model(params) {
    let name = this.paramsFor('users.name').name;
    return Ember.$.ajax(`https://api.github.com/repos/${name}/${params.repo}/languages`).then( data => {
      return entries(data);
    });
  }
});
