#!/usr/bin/env node

import { Caller } from './@types/model';
import {
	removeFirstItem,
	runner,
	removeFirstItems,
	HelperCaller
} from './helper';
import { readFileSync } from 'fs';
import { Config } from './@types/config';
import { dirname, join } from 'path';

const installLocation = dirname(process.argv[1]);
const configLocation = join(installLocation, 'config.json');
const config: Config = JSON.parse(readFileSync(configLocation).toString());

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
let defaultCaller: Caller = callers.values().next().value;

const forwardKeywords = [
	'builder',
	'config',
	'container',
	'context',
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
	'volum'
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
