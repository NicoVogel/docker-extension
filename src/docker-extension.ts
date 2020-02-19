#!/usr/bin/env node

import { Caller } from './@types/model';
import { Config } from './@types/config';
import { dirname, join } from 'path';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { sync as mkdirpSync } from 'mkdirp';
import { spawn } from 'child_process';

const removeFirstItem = <T>(array: T[]): T[] => removeFirstItems(array, 1);

const removeFirstItems = <T>(array: T[], amount: number): T[] => {
	const clone = [...array];
	clone.splice(0, amount);
	return clone;
};

const runner = (
	command: string,
	action: string,
	args: string[],
	showCommand?: boolean
) => {
	if (showCommand === undefined) {
		showCommand = false;
	}
	if (showCommand) {
		console.log(
			`-> docker ${command} ${action} ${args.join(' ')}`
		);
	}
	const child = spawn('docker', [command, action, ...args], {
		stdio: 'inherit'
	});
	child.on('message', msg => console.log(msg));
	child.on('error', err => console.error(err));
	child.on('close', data => {
		// is invoked when command is done
	});
};

class HelperCaller implements Caller {
	constructor(
		private command: string,
		private maps: Map<string, string>,
		private defaultAction: string,
		private showCommand?: boolean
	) { }
	invoke(args: string[]): void {
		const firstArg = args[0];
		let action =
			firstArg === undefined ? this.defaultAction : this.maps.get(firstArg);
		if (action === undefined) {
			action = firstArg;
		}
		runner(this.command, action, args, this.showCommand);
	}
}

const defaultConfig: Config = {
	showCommand: true,
	abbrev: {
		c: {
			command: 'container',
			default: 'ps',
			mappings: [['p', 'prune'], ['e', 'exec'], ['i', 'inspect']]
		},
		i: {
			command: 'image',
			default: 'ls',
			mappings: [['h', 'history'], ['i', 'inspect'], ['p', 'prune'], ['b', 'build']]
		},
		n: {
			command: 'network',
			default: 'ls',
			mappings: [['p', 'prune'], ['i', 'inspect']]
		},
		v: {
			command: 'volume',
			default: 'ls',
			mappings: [['p', 'prune'], ['i', 'inspect']]
		}
	}
};

const getConfig = (processUrl: string): Config => {
	try {
		const installLocation = dirname(processUrl);
		const configLocation = join(
			installLocation,
			'./.config/docker-extension.json'
		);
		if (existsSync(configLocation) === false) {
			try {
				mkdirpSync(dirname(configLocation));
				writeFileSync(configLocation, JSON.stringify(defaultConfig, null, 2));
			} catch (err) {
				throw new Error(
					`Unable to write default config to location ${configLocation}. Error message: ${err.message}`
				);
			}
			return defaultConfig;
		}
		try {
			return JSON.parse(readFileSync(configLocation).toString()) as Config;
		} catch (err) {
			throw new Error(
				`Unable to load and parse the the config file from location ${configLocation}. Error message: ${err.message}`
			);
		}
	} catch (err) {
		console.error(`Problem while managing the config file! ${err.message}`);
	}
	return defaultConfig;
};

const run = () => {
	const config = getConfig(process.argv[1]);
	const callers: Map<string, Caller> = new Map();

	for (const key in config.abbrev) {
		if (config.abbrev.hasOwnProperty(key)) {
			const data = config.abbrev[key];
			const caller = new HelperCaller(
				data.command,
				key,
				new Map(data.mappings),
				data.default,
				config.showCommand
			);
			callers.set(key, caller);
		}
	}

	const defaultCaller: Caller = callers.values().next().value;
	const forwardKeywords = [
		'builder',
		'config',
		'container',
		'context',
		'images',
		'image',
		'network',
		'node',
		'plugin',
		'secret',
		'service',
		'stack',
		'swarm',
		'system',
		'trust',
		'volume'
	];

	const args = removeFirstItems(process.argv, 2);
	if (args.length === 0) {
		defaultCaller.invoke([]);
	} else {
		const command = args[0];
		if (forwardKeywords.some(keyword => keyword === command)) {
			const action = args[1];
			const params = removeFirstItems(args, 2);
			console.log({ command, action, params });
			runner(command, action, params, config.showCommand);
		}
		let selectCaller = callers.get(command);
		if (selectCaller === undefined) {
			selectCaller = defaultCaller;
		}
		selectCaller.invoke(removeFirstItem(args));
	}
};

run();