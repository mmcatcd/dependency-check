import React, { Component } from 'react';
import ReactDOM from "react-dom";

const measureElement = element => {
  const DOMNode = ReactDOM.findDOMNode(element);
  return {
    width: DOMNode.offsetWidth,
    height: DOMNode.offsetHeight,
  };
}

class DashboardBox extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false
    }
  }

  componentDidMount() {
    if (this.props.measurements !== undefined) {
      this.props.measurements(measureElement(this.dashboardContainer));
    }
  }

  render() {
    const { isHovered } = this.state;

    return (
      <div style={{
        ...styles.container, 
        transform: isHovered ? 'translateY(-1px)' : '',
        boxShadow: isHovered ? '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)' 
          : '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
        float: this.props.display === 'inline' ? 'left' : 'none',
        display: this.props.display === 'inline' ? 'inline-block' : 'inherit',
        width: this.props.width
      }}
      onMouseOver={() => this.setState({ isHovered: true })}
      onMouseLeave={() => this.setState({ isHovered: false })}>
        <div ref={r => this.dashboardContainer = r} style={styles.contentContainer}>{this.props.children}</div>
    </div>
    )
  }
}

const styles = {
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'auto',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    transition: 'all .15s ease'
  },
  contentContainer: {
    margin: '20px 40px',
    textAlign: 'left'
  }
}

export default DashboardBox;