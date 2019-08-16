import { exec } from 'child_process';
import { CommanderStatic } from 'commander';

const execPrune = (options: any): void => {
	exec(
		`docker network prune ${!options['no-force'] ? '-f' : ''}`,
		(error, stdout, stderr) => {
			console.log(stdout);
		}
	);
};
const execLs = (): void => {
	exec(`docker network ls`, (error, stdout, stderr) => {
		console.log(stdout);
	});
};

const selectCommand = (command: string, options: any): void => {
	switch (command) {
		case 'p':
		case 'prune':
			execPrune(options);
			break;
		default:
			execLs();
	}
};

export const setupNetworkCommands = (program: CommanderStatic): void => {
	program
		.command('network <command>')
		.alias('n')
		.description('network actions, by default list networks')
		.option('')
		.option('p prune', 'prune networks')
		.option('-f --noforce', 'do not force prune')
		.option('')
		.action((command, options) => {
			selectCommand(command, options);
		});
};
