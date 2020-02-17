import { spawn } from 'child_process';
import { Caller } from './@types/model';

export const removeFirstItem = (array: any[]) => removeFirstItems(array, 1);

export const removeFirstItems = (array: any[], amount: number) => {
	const clone = [...array];
	clone.splice(0, amount);
	return clone;
};

export const runner = (
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
			`-> docker ${command} ${action} ${removeFirstItem(args).join(' ')}`
		);
	}
	const forwardArgs = removeFirstItem(args);
	const child = spawn('docker', [command, action, ...forwardArgs], {
		stdio: 'inherit'
	});
	child.on('close', data => {
		// is invoked when command is done
	});
};

export class HelperCaller implements Caller {
	constructor(
		private command: string,
		private abbrev: string,
		private maps: Map<string, string>,
		private defaultAction: string,
		private showCommand?: boolean
	) { }
	abbriviation(): string {
		return this.abbrev;
	}
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
