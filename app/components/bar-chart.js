import Ember from 'ember';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { max } from 'd3-array';

export default Ember.Component.extend({
  didRender() {
    let data = this.get('data');

    let xAxis = axisBottom(this.x);
    let maxY = max(data, d => d.value );

    let yAxis = axisLeft(this.y)
        .ticks(10, 's');

    let svg = select("#bar-chart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x.domain(data.map( d => d.key ));
    this.y.domain([0, maxY]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => this.x(d.key) )
        .attr("width", this.x.bandwidth())
        .attr("y", d => this.y(d.value) )
        .attr("height", d => this.height - this.y(d.value) );
  },

  didInsertElement() {
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.x = scaleBand()
        .range([0, this.width]);

    this.y = scaleLinear()
        .range([this.height, 0]);
  }
});
