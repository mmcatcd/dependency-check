import React, { Component } from 'react';
import Colors from './Colors';

class SearchBar extends Component {
  render() {
    return(
      <div>
        <form action="/search" method="get" style={{fontSize: 24}}>
          <input type="text" className="searchBar" placeholder="Search for a dependency..." style={styles.searchBar} />
        </form>
      </div>
    )
  }
}

const styles = {
  searchBar: {
    boxSizing: 'border-box',
    fontSize: 15,
    fontFamily: 'Lato',
    color: Colors.lightGrey,
    width: '100%',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 100,
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
  }
}

export default SearchBar;