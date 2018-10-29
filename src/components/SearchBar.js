import React, { Component } from 'react';
import Colors from './Colors';
import { SearchRepo } from '../graphql/queries/GithubQueries';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      search: {
        text: "e",
        isEmpty: true
      }
    }
  }

  checkSearchText(event) {
    const { value } = event.target

    this.props.searchChange(value); // Callback

    console.log(this.state.search.text);

    if (value !== "") {
      this.setState({
        search: {
          text: event.target.value,
          isEmpty: false
        }
      });
    } else {
      this.setState({
        search: {
          ...this.state.search, 
          isEmpty: true
        }
      });
    }
  }

  render() {
    const { isEmpty } = this.state.search

    return(
      <div>
        <form action="/search" method="get" style={{fontSize: 24}}>
          <input 
            type="text" 
            onChange={this.checkSearchText.bind(this)} 
            className="searchBar" 
            placeholder="Search for a dependency..." 
            style={{
              ...styles.searchBar, 
              borderRadius: isEmpty ? 100 : 10, 
              borderBottomLeftRadius: isEmpty ? 100 : 0, 
              borderBottomRightRadius: isEmpty ? 100 : 0
            }} />
          <div style={{...styles.results, height: isEmpty ? 0 : 150}}>
            <SearchRepo repo={this.state.search.text} />
          </div>
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
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: '0 4px 6px rgba(50,50,93,.11)',
    zIndex: 1,
    transitionDelay: '0.2s',
    transitionProperty: 'all',
    transitionDuration: '.15s',
  },
  results: {
    backgroundColor: '#fff',
    zIndex: 2,
    position: 'relative',
    boxShadow: '0 4px 6px rgba(50,50,93,.11)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -10,
    transitionDelay: '0.2s',
    transitionProperty: 'all',
    transitionDuration: '.15s',
    overflow: 'hidden'
  }
}

export default SearchBar;