import { spawn } from 'child_process';
import { getConfig } from './configHandler';

export const runner = (
	command: string,
	action: string,
	args: string[]
): void => {
	const spawnArgs = [command, action, ...args].filter(
		element => element !== undefined
	);
	if (getConfig().showCommand) {
		console.log(`-> docker ${spawnArgs.join(' ')}`);
	}
	const child = spawn('docker', spawnArgs, {
		stdio: 'inherit'
	});
	child.on('message', console.log);
	child.on('error', console.error);
};
