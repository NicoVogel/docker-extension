import { Caller } from './@types/model';
import { runner } from './runner';
import { removeFirstItem } from './removeItem';

export class HelperCaller implements Caller {
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
