import React, { Component } from 'react';
import * as d3 from 'd3';

class DependencyWheel extends Component {
  constructor(props) {
    super(props);
    this.createDependencyWheel = this.createDependencyWheel.bind(this);
  }

  componentDidMount() {
    this.createDependencyWheel();
  }

  componentDidUpdate() {
    this.createDependencyWheel();
  }

  createDependencyWheel() {
    const node = this.node;
    
    var width = 700;
    var margin = 150;
    var padding = 0.02;

    const data = this.props.data;

    var matrix = data.matrix;
    var packageNames = data.packageNames;
    var radius = width / 2 - margin;

    // create the layout
    var chord = d3.chord()
      .padAngle(padding)
      .sortSubgroups(d3.descending);

    // Otherwise, create the skeletal chart.
    var gEnter = d3.select(node)
      .attr("width", width)
      .attr("height", width)
      .attr("class", "dependencyWheel")
    .append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (width / 2) + ")");

    var arc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius + 20);

    var fill = function(d) {
      if (d.index === 0) return '#ccc';
      return "hsl(" + parseInt(((packageNames[d.index][0].charCodeAt() - 97) / 26) * 360, 10) + ",90%,70%)";
    };

    // Returns an event handler for fading a given chord group.
    var fade = function(opacity) {
      return function(g, i) {
        gEnter.selectAll(".chord")
            .filter(function(d) {
              return d.source.index !== i && d.target.index !== i;
            })
          .transition()
            .style("opacity", opacity);
        var groups = [];
        gEnter.selectAll(".chord")
            .filter(function(d) {
              if (d.source.index === i) {
                groups.push(d.target.index);
              }
              if (d.target.index === i) {
                groups.push(d.source.index);
              }
            });
        groups.push(i);
        var length = groups.length;
        gEnter.selectAll('.group')
            .filter(function(d) {
              for (var i = 0; i < length; i++) {
                if(groups[i] === d.index) return false;
              }
              return true;
            })
            .transition()
              .style("opacity", opacity);
      };
    };

    var chordResult = chord(matrix);

    var rootGroup = chordResult.groups[0];
    var rotation = - (rootGroup.endAngle - rootGroup.startAngle) / 2 * (180 / Math.PI);

    var g = gEnter.selectAll("g.group")
      .data(chordResult.groups)
      .enter().append("svg:g")
      .attr("class", "group")
      .attr("transform", function(d) {
        return "rotate(" + rotation + ")";
      });

    g.append("svg:path")
      .style("fill", fill)
      .style("stroke", fill)
      .attr("d", arc)
      .style("cursor", "pointer")
      .on("mouseover", fade(0.1))
      .on("mouseout", fade(1));

    g.append("svg:text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
          "translate(" + (radius + 26) + ")" +
          (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("cursor", "pointer")
      .text(function(d) { return packageNames[d.index]; })
      .on("mouseover", fade(0.1))
      .on("mouseout", fade(1));

    gEnter.selectAll("path.chord")
        .data(chordResult)
        .enter().append("svg:path")
        .attr("class", "chord")
        .style("stroke", function(d) { return d3.rgb(fill(d.source)).darker(); })
        .style("fill", function(d) { return fill(d.source); })
        .attr("d", d3.ribbon().radius(radius))
        .attr("transform", function(d) {
          return "rotate(" + rotation + ")";
        })
        .style("opacity", 1);
  }

  render() {
    return <svg ref={node => this.node = node}
    width={500} height={500}></svg>
  }
}

export default DependencyWheel;