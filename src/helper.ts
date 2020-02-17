import { exec } from 'child_process';
import { Caller } from './@types/model';

export const removeFirstItem = (array: any[]) => removeFirstItems(array, 1);

export const removeFirstItems = (array: any[], amount: number) => {
	const clone = [...array];
	clone.splice(0, amount);
	return clone;
};

export const runner = (command: string, action: string, args: string[]) => {
	const fullCommand = `docker ${command} ${action} ${removeFirstItem(args).join(' ')}`;
	console.log(`DEBUG: ${fullCommand}`);
	exec(fullCommand, (error, stdout, stderr) => {
		if (stderr !== '') {
			console.error(stderr);
		}
		console.log(stdout);
	});
};

export class HelperCaller implements Caller {
	constructor(
		private command: string,
		private abbrev: string,
		private maps: Map<string, string>,
		private defaultAction: string
	) { }
	abbriviation(): string {
		return this.abbrev;
	}
	invoke(args: string[]): void {
		const firstArg = args[0];
		let action = firstArg === undefined ? this.defaultAction : this.maps.get(firstArg);
		if (action === undefined) {
			action = firstArg;
		}
		runner(this.command, action, args);
	}
}
