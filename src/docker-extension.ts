#!/usr/bin/env node

import { Caller } from './@types/model';
import { container } from './container';
import { removeFirstItem, runner, removeFirstItems } from './helper';
import { existsSync } from 'fs';

const removeURLParameter = (args: string[]) => {
	const clone = [...args];
	for (let index = 0; index < clone.length; index++) {
		const arg = clone[index];
		try {
			if (existsSync(arg) === false) {
				break;
			}
			clone.shift();
			index--;
		} catch (error) {
			break;
		}
	}
	return clone;
};

const callerImports = [container];
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
]
const callers: Map<string, Caller> = new Map();
callerImports.forEach(caller => callers.set(caller.abbriviation(), caller));
const args = removeURLParameter(process.argv);

console.log(process.argv);
console.log(args);


if (args.length === 0) {
	console.log('no param');
	callerImports[0].invoke([]);
} else {
	const command = args[0];
	if (forwardKeywords.some(keyword => keyword === command)) {
		const action = args[1];
		const params = removeFirstItems(args, 2);
		console.log({ command, action, params });
		runner(command, action, params);
	}
	let selectCaller = callers.get(command);
	if (selectCaller === undefined) {
		selectCaller = callerImports[0];
	}
	console.log(JSON.stringify(selectCaller));
	selectCaller.invoke(removeFirstItem(args));
}
