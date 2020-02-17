# docker-extension

[![Build Status](https://travis-ci.org/NicoVogel/docker-extension.svg?branch=master)](https://travis-ci.org/NicoVogel/docker-extension)

This project is a CLI to shorten the docker commands. You can define the abbreviations in the `config.json` file.

## Getting Started

```bash
npm i docker-extension -g
```

Now you can use the predefined abbreviations. You can edit them in the `config.json` which is located next to the `docker-extension.js` 

## Future planes

### Update config

It's no fun to navigate to the config file. Therefore, a better approach is needed. The current idea is to include a command which allows you to override the given config with another config.

### Custom build command

Sometimes you need to build an image more than once by hand, because it would cost too much time to automate it or you just play around. Possible features for the custom build command are:

- remember the build commands
- add a rebuild command which uses the last build command 

