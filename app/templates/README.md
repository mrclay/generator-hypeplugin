# <%= userOpts.pluginName %> for Elgg

![Elgg <%= userOpts.requireElgg %>](https://img.shields.io/badge/Elgg-<%= userOpts.requireElgg %>-orange.svg?style=flat-square)

## Features


## Acknowledgements


## Usage / Installation


## Releases

To make an automated release

First, set `process.env.GITHUB_TOKEN` to your Github token

```sh
npm install

# major release
grunt release:major

## minor release
grunt release:minor

# patch release
grunt release:patch
```

This will make a git push, create new tag, sync tags, and upload a zip package to github releases