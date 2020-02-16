#!/usr/bin/env node

import { Caller } from './@types/model';
import { container } from './container';
import { removeFirstArrayItem } from './helper';

const callers: Caller[] = [container];

const args = removeFirstArrayItem(process.argv);

if (args.length === 0) {
	// no parameter at all
	callers[0].invoke([]);
} else {
	callers.forEach(caller => {
		if (caller.abbriviation() === args[0]) {
			caller.invoke(removeFirstArrayItem(args));
		}
	});
}
