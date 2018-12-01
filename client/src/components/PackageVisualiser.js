import React, { Component } from 'react';
import RepoOverview from './RepoOverview';
import VisualDependencies from './VisualDependencies';

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

  displayVisualDependencies() {
    if (this.state.chord == null || this.state.data == null) {
      return;
    }else {
      const visualDepData = {
        data: this.state.data,
        chord: this.state.chord
      }

      return <VisualDependencies data={visualDepData} package={this.props.package} />;
    }
  }

  render() {
    

    return(
      <div>
        <RepoOverview package={this.props.package} />
        {this.displayVisualDependencies()}
      </div>
    )
  }
}

export default PackageVisualiser;