# Docker commands in short

[![Build Status](https://travis-ci.org/NicoVogel/docker-extension.svg?branch=master)](https://travis-ci.org/NicoVogel/docker-extension)

This project is a CLI to shorten the docker commands. You can define the abbreviations in the `docker-extension.json` file.

## Getting Started

```bash
npm install -g docker-extension
```

Now you can use the default abbreviations. To edit the abbreviations, open the config file `docker-extension.json` which is located next to the docker-extension.js in the npm-global directory.

> /path/to/the/npm-global/directory/`.config/docker-extension.json` (You can also use the extension specific commands for that)

## How does it work?

The cli tool uses a config file to manage the abbreviations. All commands are separated into a *command* and *action*. For example, `docker image ls` has the *command* `image` and *action* `ls`. When resolving the abbreviations, first the commands are checked and then the associated actions for the command.

## Usage

The shortest command is:

```bash
dc
```

This will execute the default command mapping and its default action mapping. If you did not change the config, this results in `docker container ps`.

If you provide a flag, it will not change the command and action.

```bash
dc -a
```

Results in `docker container ps -a`.

You do not need to use the abbreviations. If the given command matches a docker command, then no logic will be executed.

```bash
dc images
```

Results in `docker images`.

## Config

The config is in the file `.config/docker-extension.json`, which is next to the installed `docker-extension.js`. If no config exists, the config is created by the default settings. If there is any issue while loading the file, the default is used.

### Config structure

The following structure can also be found at `src/@types/config.d.ts`.

```js
export interface Config {
    // show the resulting command before executing it
	showCommand?: boolean;
	// which command mapping is used if no command is provided (has to be the abbreviation)
	default: string;
	// the abbreviation is the property name
	commandMappings: {
		[commandMappings: string]: {
			// the full command name
			command: string;
			// which action is executed by default (has to be any full action)
			default: string;
			// the fist value is the abbreviation and the second the full action
			actionMappings: [string, string][];
		};
	};
	// custom defined commands
	customCommandMappings?: {
		// The property name is the command name
		// The value is a docker command with placeholders
		[commandMapping: string]: string;
	};
}
```

### Default config

When you install the extension for the first time, this config will be created. If there are any issues while reading or processing the config, this config is also used.

```js
{
	showCommand: true,
	default: 'c',
	commandMappings: {
		c: {
			command: 'container',
			default: 'ps',
            actionMappings: [['p', 'prune'], 
                            ['e', 'exec'], 
                            ['i', 'inspect']]
		},
		i: {
			command: 'image',
			default: 'ls',
			actionMappings: [
				['h', 'history'],
				['i', 'inspect'],
				['p', 'prune'],
				['b', 'build']
			]
		},
		n: {
			command: 'network',
			default: 'ls',
            actionMappings: [['p', 'prune'], 
                            ['i', 'inspect']]
		},
		v: {
			command: 'volume',
			default: 'ls',
            actionMappings: [['p', 'prune'], 
                            ['i', 'inspect']]
		}
	},
	customCommandMappings: {
		bash: 'docker exec -it $0 /bin/bash',
		rmdang: "docker rmi $(docker images -f 'dangling=true' -q)",
		rmall: 'docker rm -v $(docker ps -aq)'
	}
}
```
## Hirarchy of execution

There are several command types which could overlap. To resolve collisions the following hirarchy is used.

1. Default docker commands
2. The keyword for the extension specific commands (`extension`)
3. The custom commands
4. The abbriviations

The default docker commands are:
`builder, config, container, context, image, images, network, node, plugin, secret, service, stack, swarm, system, trust, volume, rmi, pull, build`

So if you define an abbriviation which has the same keyword as a custom command, then it will never be executed.

## Extension specific commands

The extension supports two extension specific functions.

- `dc extension help` print help text
- `dc extension get-config` prints the config location.
- `dc extension save-config <file-path>` override the config with the given file.
- `dc extension edit` open config in system's default editor
- `dc extension version` print version number

## Custom Commands

You can define custom commands which contain placeholders. These placeholders use the prefix `$` and start with number 0. Internally it uses `string.replace()`, so its rather simple. 

The default config contains some handy examples. One example is `bash` which executes `docker exec -it $0 /bin/bash`. So if you use the command `dc bash bc45`, this will be translated to `docker exec -it bc45 /bin/bash`.

## Hint

If you disable `showCommand`, you can stack commands within each other.

Example:

```bash
dc rm -vf $(dc -aq)
```

> Removes all containers

## Future planes

### Update config

It's no fun to navigate to the config file. Therefore, a better approach is needed. The current idea is to include a command which allows you to override the given config with another config.

### Custom build command

Sometimes you need to build an image more than once by hand, because it would cost too much time to automate it or you just play around. Possible features for the custom build command are:

- remember a build command
- add a rebuild command which uses the last build command 
