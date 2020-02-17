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
	console.log(fullCommand);
	exec(fullCommand, (error, stdout, stderr) => {
		console.log({ error, stdout, stderr })
		if (error !== undefined && error !== null) {
			console.error(error);
			return;
		}
		if (stderr !== undefined) {
			console.log(stderr);
			return;
		}
		console.log(stdout);
	});
};

export class HelperCaller implements Caller {
	constructor(
		private command: string,
		private abbrev: string,
		private maps: Map<string, string>
	) { }
	abbriviation(): string {
		return this.abbrev;
	}
	invoke(args: string[]): void {
		console.log(`invoke call with params: ${JSON.stringify(args)}`)
		const firstArg = args[0];


		let action = firstArg === undefined ? this.maps.values().next().value : this.maps.get(firstArg);
		if (action === undefined) {
			action = firstArg;
		}
		runner(this.command, action, args);
	}
}
