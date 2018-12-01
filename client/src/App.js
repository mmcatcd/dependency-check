import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';

import { githubClient } from './graphql/GithubClient';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import Colors from './components/Colors';
import Example from './components/Example';
import { getPackage } from './npm/npmQueries';

import PackageVisualiser from './components/PackageVisualiser';

const exampleData = ['express', 'passport', 'apollo'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchBar: {
        isEmpty: true
      },
      visualHidden: true,
      selectedPackage: null,
      examples: []
    }
  }

  async componentDidMount() {
    exampleData.forEach(async (name) => {
      const results = await getPackage(name);
      console.log(results);
      this.setState(prev => ({ examples: [...prev.examples, results] }));
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchBar.isEmpty !== this.state.searchBar.isEmpty) {
      this.setState({ ...this.state, visualHidden: this.state.searchBar.isEmpty });
    }
  }

  searchChange(value) {
    if (value === "") {
      this.setState({searchBar: { isEmpty: true }});
    } else {
      this.setState({searchBar: { isEmpty: false }});
    }
  }

  selectPackage(selectedPackage) {
    this.setState({ 
      ...this.state,
      selectedPackage: selectedPackage, 
      visualHidden: false });
  }

  async selectPackageFromName(selectedPackage) {
    const results = await getPackage(selectedPackage);
    this.setState(prev => ({ selectedPackage: results }));
  }

  render() {
    const { visualHidden } = this.state;

    const examples = this.state.examples.map(repo => {
      const meta = repo.collected.metadata;
      if (meta !== undefined && visualHidden) {
        return (
          <Example
            package={repo}
            selected={this.selectPackage.bind(this)} 
          />);
      }

      return <div />;
    });

    const displayExamples = () => {
      if (visualHidden) {
        return (
          <div style={styles.exampleContainer}>
            <h2 style={styles.exampleHeader}>Examples</h2>
            {examples}
          </div>
        );
      }

      return <div />;
    }

    const displayVisualisation = () => {
      if (!visualHidden && this.state.selectedPackage != null) {
        return (
          <div>
            <PackageVisualiser package={this.state.selectedPackage} />
          </div>
        )
      }

      return <div />;
    }

    return (
      <ApolloProvider client={githubClient}>
        <div className="App">
          <div style={styles.searchContainer} className="searchContainer">
            <div style={styles.logoContainer}><Logo title="Dependency Check" subtitle="npm" /></div>
            <div style={styles.searchBarContainer}><SearchBar setResult={this.selectPackageFromName.bind(this)} searchChange={this.searchChange.bind(this)} placeholder="Search for npm dependency..." /></div>
            {displayExamples()}
            {displayVisualisation()}
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
