# Dependency Check

## Project Overview

Dependency Check is a dependency visualisation project, specifically for NPM, the package manager for Node.js. The project aims to:

1. Visually display the quality of a dependency package to make it easier to decide whether to use a depedency.
2. Display a a graph of all other dependencies that the package relies on in a number of intuitive ways.

The motivations for this project came from a need for a tool to analyse the quality of a potential dependency. I was working on building an API in Node.js for a large organisation so dependency quality management was a key factor in the development process. 

In addition, production servers were blocked from direct access to the web for security reasons. In order to install dependencies, firewall rules had to put in place for every dependency in the tree. It was essential therefore, that all dependencies used in the project had a low number of dependencies.

A tool such as Dependency Check can provide quality metrics as well as a dependency tree graph and dependency wheel to evaluate any NPM package.

## Installation

### Prerequisites

1. Have Docker installed on your machine.

### Process

Run:

```
$ docker-compose up
```

To access the application, navigate to ``http://localhost:3000`` in the browser.

## Demo

[![](http://img.youtube.com/vi/rli4fReBgFg/0.jpg)](http://www.youtube.com/watch?v=rli4fReBgFg "")