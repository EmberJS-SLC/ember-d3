import Ember from 'ember';
import { entries } from 'd3-collection';

export default Ember.Route.extend({
  model(params) {
    let name = this.paramsFor('users.name').name;
    let q = `https://api.github.com/repos/${name}/${params.repo}/languages`;
    return Ember.$.ajax(q).then( data => entries(data) );
  }
});
