/** 
 * Defines a graphql schema.
*/

const { gql } = require('apollo-server-express');

const packages = {
  
}

const typeDefs = gql`
  type Query {
    hello: String
    package: Package
  }

  type Package {
    name: String!
    test: String!
  }
`;

/*
const package = gql `
  "NPM package."
  type Package {
    "The time that the package information was pulled at."
    analyzedAt: String

    metadata: {
      name: String
      version: String
      description: String,
      keywords: [String]
      author: User
      publisher: User
      maintainers: [User]
      contributors: [User]
      repository: {
        type: String
        url: String
      }
      dependencies: [Dependency]
      devDependencies: [Dependency]
    }
  }

  "A user who contributes to the package."
  type User {
    name: String!
    email: String
  }

  "A dependency of the package."
  type Dependency {
    name: String!
    version: String!
  }
`;*/

module.exports = typeDefs;