import { CommanderStatic } from 'commander';
import { Docker } from 'docker-cli-js';
import { NetworkCommand } from './model/docker-cli-js';

const execLs = (docker: Docker): void => {
	docker.command('network ls').then(function(data: NetworkCommand) {
		console.log(data.raw);
	});
};

const execPrune = (docker: Docker, options: any): void => {
	docker
		.command(`network prune ${!options['no-force'] ? '-f' : ''}`)
		.then(function(data: NetworkCommand) {
			console.log(data.raw);
		});
};

const selectCommand = (docker: Docker, command: string, options: any): void => {
	switch (command) {
		case 'p':
		case 'prune':
			execPrune(docker, options);
			break;
		default:
			execLs(docker);
	}
};

export const setupNetworkCommands = (
	program: CommanderStatic,
	docker: Docker
): void => {
	program
		.command('network <command>')
		.alias('n')
		.description('network actions, by default list networks')
		.option('')
		.option('p prune', 'prune networks')
		.option('-f --noforce', 'do not force prune')
		.option('')
		.action((command, options) => {
			selectCommand(docker, command, options);
		});
};
