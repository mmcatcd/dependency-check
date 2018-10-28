# Dependency Check Server

The server for Dependency Check, a dependency analysis tool.

## Installation

### Prerequisites

1. [Nodejs](https://nodejs.org/en/) installed

### Installation process

1. Clone the repo:
```
$ https://github.com/mmcatcd/dep-check-server.git
```

2. Add the access token via GITHUB_ACCESS_TOKEN environment variable. You can create an access token by logging into your GitHub account Settings > Developer Settings > Personal access tokens and add a new token. The token needs:
- admin:read:org
- user:read:user
- user:email
- user:follow
- read:discussion

To add the token as an environment variable:
```
$ export GITHUB_ACCESS_TOKEN=xxxXXX
```

3. Run:
```
$ npm install
```