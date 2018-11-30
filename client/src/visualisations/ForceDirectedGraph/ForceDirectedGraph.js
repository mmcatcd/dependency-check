import React, { Component } from 'react';
import * as d3 from 'd3';

class ForceDirectedGraph extends Component {
  constructor(props) {
    super(props);
    this.createForceDirectedGraph = this.createForceDirectedGraph.bind(this);
  }

  componentDidMount() {
    this.createForceDirectedGraph();
  }

  createForceDirectedGraph() {
    const refNode = this.refNode;
    const data = this.props.data;

    function forceSimulation(nodes, links) {
      return d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id).distance(100))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter());
    }

    const width = this.props.width;
    const height = this.props.height;

    const color = () => {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return d => scale(d.group);
    }

    const drag = simulation => {
  
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }

    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
    const simulation = forceSimulation(nodes, links).on("tick", ticked);

    const svg = d3.select(refNode)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter().append("line")
        .attr("stroke-width", this.props.stroke !== undefined ? this.props.stroke : 2);

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", this.props.radius !== undefined ? this.props.radius : 10)
        .attr("fill", color())
        .call(drag(simulation));

    node.append("title")
        .text(d => d.id);

    function ticked() {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    }
  }

  render() {
    return <svg ref={refNode => this.refNode = refNode}
    width={this.props.width} height={this.props.height}></svg>
  }
}

export default ForceDirectedGraph;