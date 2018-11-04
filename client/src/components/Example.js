import React, { Component } from 'react';
import Tag from './Tag';
import colors from './Colors';
import Moment from 'moment';

class Example extends Component {
  constructor() {
    super();
    this.state = {
      container: {
        isHovered: false
      },
      link: {
        isHovered: false
      }
    }
  }

  render() {
    const { container, link } = this.state;
    const { tags } = this.props;
    const date = new Date(this.props.commitDate)

    const tagElements = tags !== undefined ? tags.map(name => {
      return(
        <Tag>{name}</Tag>
      );
    }) : null;

    return(
      <div style={{
          ...styles.container, 
          transform: container.isHovered ? 'translateY(-1px)' : '',
          boxShadow: container.isHovered ? '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)' 
            : '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
        }}
        onMouseOver={() => this.setState({container: { isHovered: true }})}
        onMouseLeave={() => this.setState({container: { isHovered: false }})}>
        <div style={styles.contentContainer}>
          <a href="/"
            onMouseOver={() => this.setState({link: { isHovered: true}})}
            onMouseLeave={() => this.setState({link: { isHovered: false }})}>
            <h3 style={{...styles.title, opacity: link.isHovered ? 1 : 0.8}}>
              {this.props.title}
            </h3>
          </a>
          <p style={styles.description}>Fast, unopinionated, minimalist web framework for node.</p>
          {tagElements}
          <p style={styles.commit}><strong>{this.props.commitAuthor}</strong> {Moment(date).fromNow()} • 4.16.4</p>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    overflow: 'auto',
    marginTop: 20,
    marginBottom: 20,
    transition: 'all .15s ease'
  },
  title: {
    color: colors.textPurple,
    transition: 'all .15s ease'
  },
  description: {
    color: colors.lightGrey
  },
  commit: {
    marginTop: 15,
    fontSize: 12,
    color: colors.lightGrey
  },
  contentContainer: {
    margin: '20px 40px',
    textAlign: 'left'
  }
}

export default Example;