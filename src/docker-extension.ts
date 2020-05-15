#!/usr/bin/env node

import { Caller } from './@types/model';
import { Config } from './@types/config';
import { dirname, join } from 'path';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { spawn } from 'child_process';

const removeFirstItems = <T>(array: T[], amount: number): T[] => {
	const clone = [...array];
	clone.splice(0, amount);
	return clone;
};

const removeFirstItem = <T>(array: T[]): T[] => removeFirstItems(array, 1);

const runner = (
	command: string,
	action: string,
	args: string[],
	showCommand?: boolean
): void => {
	if (showCommand === undefined) {
		showCommand = false;
	}
	const spawnArgs = [command, action, ...args].filter(
		element => element !== undefined
	);
	if (showCommand) {
		console.log(`-> docker ${spawnArgs.join(' ')}`);
	}
	const child = spawn('docker', spawnArgs, {
		stdio: 'inherit'
	});
	child.on('message', msg => console.log(msg));
	child.on('error', err => console.error(err));
};

class HelperCaller implements Caller {
	constructor(
		private command: string,
		private maps: Map<string, string>,
		private defaultAction: string,
		private showCommand?: boolean
	) {}
	invoke(args: string[]): void {
		let passArgs = args;
		const firstArg = passArgs[0];
		const firstArgIsFlag = firstArg !== undefined && firstArg.startsWith('-');

		// check if a action is given if its a flag
		let action =
			firstArg === undefined || firstArgIsFlag
				? this.defaultAction
				: this.maps.get(firstArg);

		if (action === undefined) {
			// could not find a mapping for the action. expect it is not a shorting and the actual action
			action = firstArg;
		}
		if (!firstArgIsFlag) {
			// remove action which is passes as a separate command
			passArgs = removeFirstItem(passArgs);
		}
		runner(this.command, action, passArgs, this.showCommand);
	}
}

const defaultConfig: Config = {
	showCommand: true,
	default: 'c',
	commandMappings: {
		c: {
			command: 'container',
			default: 'ps',
			actionMappings: [
				['p', 'prune'],
				['e', 'exec'],
				['i', 'inspect']
			]
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
			actionMappings: [
				['p', 'prune'],
				['i', 'inspect']
			]
		},
		v: {
			command: 'volume',
			default: 'ls',
			actionMappings: [
				['p', 'prune'],
				['i', 'inspect']
			]
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
				mkdirSync(dirname(configLocation), { recursive: true });
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

const generateCallers = (config: Config): Map<string, Caller> => {
	const callers: Map<string, Caller> = new Map();

	for (const key in config.commandMappings) {
		if (config.commandMappings.hasOwnProperty(key)) {
			const data = config.commandMappings[key];
			const caller = new HelperCaller(
				data.command,
				new Map(data.actionMappings),
				data.default,
				config.showCommand
			);
			callers.set(key, caller);
		}
	}

	return callers;
};

const getCallers = (): { callers: Map<string, Caller>; config: Config } => {
	const config = getConfig(process.argv[1]);
	try {
		return { callers: generateCallers(config), config };
	} catch (error) {
		console.warn(
			`Unable to generate callers from config. The defaultConfig is used instead. Message: ${error.message}`
		);
		return { callers: generateCallers(defaultConfig), config: defaultConfig };
	}
};

const getDefaultCaller = (
	callers: Map<string, Caller>,
	config: Config
): Caller => {
	const defaultCaller = callers.get(config.default);
	if (defaultCaller === undefined) {
		console.warn(
			`The default option with the abbreviation '${config.default}' does not have a mapping! the first mapping is now the default`
		);
		return callers.values().next().value;
	}
	return defaultCaller;
};

const run = (): void => {
	const forwardKeywords = [
		'builder',
		'config',
		'container',
		'context',
		'image',
		'images',
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

	const { callers, config } = getCallers();
	const defaultCaller = getDefaultCaller(callers, config);
	const args = removeFirstItems(process.argv, 2);

	if (args.length === 0) {
		defaultCaller.invoke([]);
		return;
	}

	const command = args[0];
	// ignore docker-extension logic if the first argument is a keyword from docker
	if (forwardKeywords.some(keyword => keyword === command)) {
		const action = args[1];
		const params = removeFirstItems(args, 2);
		runner(command, action, params, config.showCommand);
		return;
	}

	let selectCaller = callers.get(command);
	let passArgs = args;
	if (selectCaller === undefined) {
		selectCaller = defaultCaller;
	} else {
		passArgs = removeFirstItem(args);
	}
	selectCaller.invoke(passArgs);
};

run();
