import React, { Component } from 'react';
import Tag from './Tag';
import colors from './Colors';
import Moment from 'moment';

class RepoOverview extends Component {
  render() {
    if (this.props.package === {}) {
      return <div />;
    } else {
      const meta = this.props.package.collected.metadata !== undefined ? this.props.package.collected.metadata : null;
      const date = new Date(meta.date)

      const tagElements = meta.keywords !== undefined ? meta.keywords.map(name => {
        return(
          <Tag>{name}</Tag>
        );
      }) : null;

      return(
        <div style={styles.contentContainer}>
          <h3 
            style={styles.title}>
            {meta.name.charAt(0).toUpperCase() + meta.name.slice(1)}
          </h3>
          {tagElements}
          <p style={styles.commit}><strong>{meta.author.name}</strong> {Moment(date).fromNow()} • {meta.version}</p>
        </div>
      )
    }
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
    transition: 'all .15s ease',
    fontSize: 24
  },
  commit: {
    marginTop: 15,
    fontSize: 14,
    color: colors.lightGrey
  },
  contentContainer: {
    marginTop: 40,
    textAlign: 'left'
  }
}

export default RepoOverview;