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
          <h3 
            style={{...styles.title, opacity: link.isHovered ? 1 : 0.8, cursor: link.isHovered ? 'pointer' : 'auto'}}
            onMouseOver={() => this.setState({link: { isHovered: true }})}
            onMouseLeave={() => this.setState({link: { isHovered: false }})}
            onClick={() => this.props.selected(this.props.repo)}>
            {this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}
          </h3>
          <p style={styles.description}>{this.props.description}</p>
          {tagElements}
          <p style={styles.commit}><strong>{this.props.commitAuthor}</strong> {Moment(date).fromNow()} • {this.props.commitDescription}</p>
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