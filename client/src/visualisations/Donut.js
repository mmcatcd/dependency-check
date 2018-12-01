import React, { Component } from 'react';
import * as d3 from 'd3';
import Colors from '../components/Colors';

class Donut extends Component {
  constructor(props) {
    super(props);
    this.createDonut = this.createDonut.bind(this);
  }

  componentDidMount() {
    this.createDonut();
  }

  createDonut() {
    var node = this.node;
    
    var data = this.props.data.data;
    var totalCount = this.props.data.totalCount;		//calcuting total manually
    
    var width = this.props.width,
    height = this.props.width,
    radius = this.props.width/2-100;

		var arc = d3.arc()
    	.outerRadius(radius - 10)
    	.innerRadius(radius-30);

		var pie = d3.pie()
	    .sort(null)
	    .value(function(d) {
	        return d.count;
	    });

		var svg = d3.select(node).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g");    

   	g.append("path")
    	.attr("d", arc)
      .style("fill", function(d,i) {
      	return d.data.color;
      });

    g.append("text")
    	.attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5;	//multiply by a constant factor
        _d[1] *= 1.5;	//multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .attr('fill', Colors.textPurple)
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.name;
      });
        
    g.append("text")
	   .attr("text-anchor", "middle")
     .attr('font-size', '4em')
     .attr('fill', Colors.textPurple)
		 .attr('y', 20)
	   .text(totalCount);
  }

  render() {
    return <svg ref={node => this.node = node}
    width={500} height={500}></svg>
  }
}

export default Donut;