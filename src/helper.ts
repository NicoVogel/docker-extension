import { exec } from 'child_process';
import { Caller } from './@types/model';

export const removeFirstArrayItem = (array: any[]) => {
	const clone = [...array];
	clone.splice(0, 1);
	return clone;
};

export const runner = (command: string, action: string, args: string[]) => {
	exec(`docker ${command} ${action} ${removeFirstArrayItem(args).join(' ')}`);
};

export class HelperCaller implements Caller {
	constructor(
		private command: string,
		private abbrev: string,
		private maps: Map<string, string>
	) {}
	abbriviation(): string {
		return this.abbrev;
	}
	invoke(args: string[]): void {
		const firstArg = args[0];
		let action = this.maps.get(firstArg);
		if (action === undefined) {
			action = firstArg;
		}
		runner(this.command, action, args);
	}
}
