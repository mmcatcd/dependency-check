import React, { Component } from 'react';
import Colors from './Colors';
import DashboardBox from './DashboardBox';
import ForceDirectedGraph from '../visualisations/ForceDirectedGraph/ForceDirectedGraph';
import DependencyWheel from '../visualisations/DependencyWheel';
import Donut from '../visualisations/Donut';
import TextStat from './TextStat';

class VisualDependencies extends Component {
  constructor() {
    super();
    this.state = {
      wheelWidth: 0,
      graphWidth: 0
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setWheelWidth(measurements) {
    console.log("Wheel width", measurements.width);
    this.setState({ ...this.state, wheelWidth: measurements.width });
  }

  setGraphWidth(measurements) {
    console.log("Graph width", measurements.width);
    this.setState({ ...this.state, graphWidth: measurements.width });
  }

  render() {
    const data = this.props.data;
    const score = this.props.package.score;
    const pEval = this.props.package.evaluation;

    const quality = Math.floor(((score.detail.quality/100)*33.33)*100);
    const popularity = Math.floor(((score.detail.popularity/100)*33.33)*100);
    const maintenance = Math.floor(((score.detail.maintenance/100)*33.33)*100);
    const total = Math.floor(score.final*100);

    const scoreData = {
      data: [
        {name: 'quality', count: quality, color: Colors.blue},
        {name: 'popularity', count: popularity, color: Colors.green},
        {name: 'maintenance', count: maintenance, color: Colors.purple},
        {name: '', count: 100-quality-popularity-maintenance, color: Colors.white}
      ],
      totalCount: total,
    }

    return(
      <div>
        <h2 style={styles.exampleHeader}>Package Measurement</h2>
        <div style={{ float: 'left', width: 520 }}>
        <DashboardBox width='100%'>
          <h3>Score</h3>
          <Donut data={scoreData} width={500} />
        </DashboardBox>
        </div>
        <div style={{ width: 250, float: 'left', marginLeft: 10}}>
          <TextStat title='Carefulness' value={(pEval.quality.carefulness).toFixed(2)} />
          <TextStat title='Tests' value={(pEval.quality.tests).toFixed(2)} />
          <TextStat title='Health' value={(pEval.quality.health).toFixed(2)} />
          <TextStat title='Branding' value={(pEval.quality.branding).toFixed(2)} />
          <TextStat title='Community Interest' value={(pEval.popularity.communityInterest).toFixed(2)} />
        </div>
        <h2 style={styles.exampleHeader}>Maintenance</h2>
        <div style={{width: '100%', display: 'inline-block', textAlign: 'left'}}>
          <TextStat title='Release Frequency' display='inline' width={245} value={(pEval.maintenance.releasesFrequency).toFixed(2)} />
          <TextStat title='Commit Frequency' display='inline' width={245} value={(pEval.maintenance.commitsFrequency).toFixed(2)} />
          <TextStat title='Issue Distribution' display='inline' width={245} value={(pEval.maintenance.issuesDistribution).toFixed(2)} />
        </div>
        <h2 style={styles.exampleHeader}>Package Dependencies</h2>
        <DashboardBox width='100%' measurements={this.setWheelWidth.bind(this)}>
          <h3>Dependency Wheel</h3>
          <DependencyWheel data={data.chord}/>
        </DashboardBox>
        <DashboardBox width='100%' measurements={this.setGraphWidth.bind(this)}>
          <h3>Dependency Graph</h3>
          <ForceDirectedGraph data={data.data} width={720} height={400}/>
        </DashboardBox>
      </div>
    )
  }
}

const styles = {
  exampleHeader: {
    color: Colors.purple,
  }
}

export default VisualDependencies;