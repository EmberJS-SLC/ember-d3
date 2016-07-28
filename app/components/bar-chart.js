import Ember from 'ember';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { max } from 'd3-array';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.x = scaleBand()
        .range([0, this.width])
        .padding(0.05);

    this.y = scaleLinear()
        .range([this.height, 0]);

    this.updateAxes();
  },

  didUpdateAttrs() {
    this.updateChart();
  },

  didInsertElement() {
    let svg = select("#bar-chart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(this.yAxis);

    this.updateChart();
  },

  updateChart() {
    let data = this.get('data');

    this.x.domain(data.map( d => d.key ));
    this.y.domain([0, max( data, d => d.value ) ]);
    this.updateAxes();

    let svg = select("#bar-chart")
      .select("g");

    svg.select(".x.axis")
        .call(this.xAxis);


    let bar = svg.selectAll(".bar")
        .data(data, d => d.key );

    bar.exit().remove();

    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => this.x(d.key) )
        .attr("width", this.x.bandwidth())
        .attr("y", d => this.y(d.value) )
        .attr("height", d => this.height - this.y(d.value) )
      .merge(bar)
        .attr("class", "bar")
        .attr("x", d => this.x(d.key) )
        .attr("width", this.x.bandwidth())
        .attr("y", d => this.y(d.value) )
        .attr("height", d => this.height - this.y(d.value) );

      svg.select(".y.axis")
        .call(this.yAxis)
  },

  updateAxes() {
    this.xAxis = axisBottom(this.x);
    this.yAxis = axisLeft(this.y)
        .ticks(10, 's');
  }
});
