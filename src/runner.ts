import { spawn } from 'child_process';

export const runner = (
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
