import React, { Component } from 'react';
import './AsterPlot.css';
import * as d3 from 'd3';

class AsterPlot extends Component {
  constructor(props) {
    super(props);
    this.createAsterPlot = this.createAsterPlot.bind(this);
  }

  componentDidMount() {
    this.createAsterPlot();
  }

  componentDidUpdate() {
    this.createAsterPlot();
  }

  createAsterPlot() {
    var node = this.node,
      width= this.props.width,
      height = this.props.height,
      data = this.props.data,
      radius = min(width, height) / 2,
      innerRadius = 0.3 * radius;

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.width; });

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([0, 0])
      .html(function(d) {
        return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
      });

    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) { 
        return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
      });

    var outlineArc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    var svg = d3.select(node).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.call(tip);

    data.forEach(d => {
      d.id = d.id;
      d.order = +d.order;
      d.color = d.color;
      d.weight = +d.weight;
      d.score = +d.score;
      d.width = +d.weight;
      d.label = d.label;
    });

    var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc); 

    // calculate the weighted mean score
    var score = 
    data.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight); 
    }, 0) / 
    data.reduce(function(a, b) { 
      return a + b.weight; 
    }, 0);

    svg.append("svg:text")
      .attr("class", "aster-score")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle") // text-align: right
      .text(Math.round(score));
  }

  render() {
    return <svg ref={node => this.node = node}
    width={500} height={500}></svg>
  }
}

export default AsterPlot;