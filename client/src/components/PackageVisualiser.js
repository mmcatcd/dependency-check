import React, { Component } from 'react';
import RepoOverview from './RepoOverview';
import ForceDirectedGraph from '../visualisations/ForceDirectedGraph/ForceDirectedGraph';
import DependencyWheel from '../visualisations/DependencyWheel';

class PackageVisualiser extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      chord: null,
    }
  }

  async componentDidMount() {
    await this.getGraphData(this.props.package.collected.metadata.name)
  }

  _fillArray(arr, rows, columns) {
    for (let i = 0; i < rows; i++) {
      arr.push([0]);
      for (let j = 0; j < columns; j++) {
        arr[i][j] = 0;
      }
    }
  }

  getGraphData(packageName) {
    fetch(`http://localhost:8000/api/crawl/${packageName}`)
      .then((res) => {return res.json()})
      .then((myJson) => {
        // Create chord data structure
        const chordData = { packageNames: [], matrix: [] };

        // Populate with all package names
        myJson.results.nodes.forEach((node) => {
          chordData.packageNames.push(node.id);
        });

        // Initialise matrix to all zeros
        const size = chordData.packageNames.length;
        this._fillArray(chordData.matrix, size, size);

        // Fill in matrix
        myJson.results.links.forEach((link) => {
          const sourceIndex = chordData.packageNames.indexOf(link.source);
          const targetIndex = chordData.packageNames.indexOf(link.target);
          console.log("Source Index: ", sourceIndex, "Target Index: ", targetIndex);
          chordData.matrix[sourceIndex][targetIndex] = 1;
        });

        this.setState({ data: myJson.results, chord: chordData })
      });
  }

  displayGraph() {
    if (this.state.data == null) {
      return;
    } else {
      return <ForceDirectedGraph width={800} height={800} data={this.state.data} />
    }
  }

  displayWheel() {
    if (this.state.chord == null) {
      return;
    } else {
      return <DependencyWheel data={this.state.chord} />
    }
  }

  render() {
    return(
      <div>
        <RepoOverview package={this.props.package} />
        {this.displayWheel()}
        {this.displayGraph()}
      </div>
    )
  }
}

export default PackageVisualiser;