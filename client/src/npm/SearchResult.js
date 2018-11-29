import React, { Component } from 'react';
import colors from '../components/Colors';

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false
    }
  }

  render() {
    const {isHovered} = this.state;

    return (
      <li style={{
          ...styles.listItem, 
          backgroundColor: isHovered ? colors.white : 'transparent' 
        }}
        onMouseOver={() => {this.setState({ isHovered: true }); console.log("isHovered=true")}}
        onMouseLeave={() => {this.setState({ isHovered: false }); console.log("isHovered=false")}}>
        <h3 style={styles.title}>{this.props.title}</h3>
        <p style={styles.description}>{this.props.description}</p>
      </li>
    );
  }
}

const styles = {
  listItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    transition: 'all .15s ease'
  },
  title: {
    color: colors.textPurple,
    transition: 'all .15s ease'
  },
  description: {
    color: colors.lightGrey
  }
}

export default SearchResult;