import React, { Component } from 'react';
import Colors from './Colors';

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false
    }
  }

  render() {
    const { isHovered } = this.state;

    return(
      <div 
        style={{...styles.tag, transform: isHovered ? 'translateY(-1px)' : '', boxShadow: isHovered ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)' : ''}} 
        onMouseOver={() => this.setState({isHovered: true})}
        onMouseLeave={() => this.setState({isHovered: false})}>
          {this.props.children}
      </div>
    )
  }
}

const styles = {
  tag: {
    backgroundColor: Colors.tagGrey,
    color: Colors.lightGrey,
    display: 'inline-block',
    transition: 'all .15s ease',
    padding: '4px 10px',
    marginRight: 10,
    marginTop: 10,
    borderRadius: 6
  }
}

export default Tag;