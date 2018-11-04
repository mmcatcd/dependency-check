import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';

import { githubClient } from './graphql/GithubClient';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import Colors from './components/Colors';
import Example from './components/Example';

const tags = ['javascript', 'nodejs', 'express', 'server'];

const exampleData = [
  {
    title: "Express",
    description: "Fast, unopinionated, minimalist web framework for node.",
    tags: ['javascript', 'nodejs', 'express', 'server'],
    commit: {
      author: "dougwilson",
      date: "2018-10-11T03:50:45Z",
      description: "4.16.4"
    }
  },
  {
    title: "SwiftyJSON",
    description: "The better way to deal with JSON data in Swift.",
    tags: ['swiftyjson', 'json', 'swift', 'xcode10', 'swift4-2', 
      'response', 'request', 'carthage', 'cocoapods', 'json-parsing-library',
      'json-parser', 'json-parsing-swift'],
    commit: {
      author: "wrongzigii",
      date: "2018-09-26T10:03:28Z",
      description: "Update README.md"
    }
  }
]

const examples = exampleData.map(repo => {
  return (
    <Example 
      tags={tags} 
      title={repo.title}
      description={repo.description}
      commitAuthor={repo.commit.author}
      commitDate={repo.commit.date}
      commitDescription={repo.commit.description}
       />);
  });

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchBar: {
        isEmpty: true
      }
    }
  }

  searchChange(value) {
    if (value === "") {
      this.setState({searchBar: { isEmpty: true }});
    } else {
      this.setState({searchBar: { isEmpty: false }});
    }
  }

  render() {
    const { isEmpty } = this.state.searchBar;

    return (
      <ApolloProvider client={githubClient}>
        <div className="App">
          <div style={styles.searchContainer} className="searchContainer">
            <div style={styles.logoContainer}><Logo /></div>
            <div style={styles.searchBarContainer}><SearchBar searchChange={this.searchChange.bind(this)} /></div>
            <div style={{...styles.exampleContainer, opacity: isEmpty ? 1 : 0}}>
              <h2 style={styles.exampleHeader}>Examples</h2>
              {examples}
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

const styles = {
  searchContainer: {
    display: 'block',
    maxWidth: 800,
    margin: 'auto',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoContainer: {
    marginTop: 30,
    marginBottom: 40
  },
  searchBarContainer: {
    padding: '0 10px'
  },
  exampleContainer: {
    marginTop: 20,
    overflow: 'auto',
    padding: '0 10px',
    transition: 'all .5s ease'
  },
  exampleHeader: {
    color: Colors.purple
  }
}

export default App;
