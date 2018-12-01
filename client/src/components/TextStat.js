import React, {Component} from 'react';
import DashboardBox from './DashboardBox';
import Colors from './Colors';

class TextStat extends Component {
  render() {
    return(
      <DashboardBox width={this.props.width !== undefined ? this.props.width : '100%'}>
        <h3>{this.props.title}</h3>
        <span style={{
          fontSize: this.props.fontSize !== undefined ? this.props.fontSize : 26,
          fontWeight: 600,
          color: Colors.purple}}>
          {this.props.value}
        </span>
      </DashboardBox>
    )
  }
}

export default TextStat;