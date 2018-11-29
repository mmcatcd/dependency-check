import React, { Component } from 'react';
import { searchPackage } from './npmQueries';
import SearchResult from './SearchResult';
import colors from '../components/Colors';

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      packages: {}
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.results !== this.props.results) {
      const results = await searchPackage(this.props.results, 5);
      this.setState({ packages: results });
    }
  }

  render() {
    const { packages } = this.state;
    const searchResults = packages.results !== undefined ? packages.results.map((result) => 
      <SearchResult title={result.package.name} description={result.package.description} />
    ) : null;

    return (
      <div>
        <ul style={styles.resultList}>{searchResults}</ul>
      </div>
    )
  }
}

const styles = {
  title: {
    color: colors.textPurple,
    transition: 'all .15s ease'
  },
  description: {
    color: colors.lightGrey
  },
  resultList: {
    listStyle: 'none',
    textAlign: 'left',
    paddingLeft: 0
  }
}

export default SearchResults;