# Dependency Check Client

The client for Dependency Check, a dependency analysis tool.

## Installation

### Prerequisites

1. [Nodejs](https://nodejs.org/en/) installed
2. [ReactJS](https://reactjs.org/docs/create-a-new-react-app.html)


### Installation process
1. Clone the repo:
```
$ https://github.com/mmcatcd/dep-check.git
```

2. Add a `.env.local` file to the client folder and add the access token `REACT_APP_GITHUB_ACCESS_TOKEN=` variable. You can create an access token by logging into your GitHub account Settings > Developer Settings > Personal access tokens and add a new token. The token needs:
- admin:read:org
- user:read:user
- user:email
- user:follow
- read:discussion

3. Install dependencies:
```
$ npm install
```

4. Run:
```
$ npm start
```