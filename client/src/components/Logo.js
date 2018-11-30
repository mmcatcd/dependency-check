import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import Colors from './Colors';

class Logo extends Component {
  render() {
    return(
      <div style={styles.container}>
        <a href="/" style={styles.link}>
        <img src={logo} alt="logo" style={styles.logo} />
        <span style={styles.text}>{this.props.title}</span>
        </a>
      </div>
    )
  }
}

const styles = {
  logo: {
    width: 45,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.textPurple,
    fontWeight: 700,
    marginLeft: 10,
    marginRight: 10,
    verticalAlign: 'top'
  }
}

export default Logo;