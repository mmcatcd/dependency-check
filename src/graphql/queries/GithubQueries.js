import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SEARCH_REPO = gql`
  query Search($repo: String!) {
    search(query: $repo, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            description
          }
        }
      }
    }
  }
`

export const SearchRepo = ({ repo }) => (
  <Query query={SEARCH_REPO} variables={{ repo }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;

      return (
        <p>{data.search.edges[0].node.name}</p>
      )
    }}
  </Query>
)