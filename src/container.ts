import { CommanderStatic } from 'commander';
import { Docker } from 'docker-cli-js';
import { ContainerCommand } from './model/docker-cli-js';

export const setupContainerCommands = (
	program: CommanderStatic,
	docker: Docker
): void => {
	const listContainer = (options: any): void => {
		docker
			.command(`ps ${options.all ? '-a' : ''} ${options.quiet ? '-q' : ''} `)
			.then(function(data: ContainerCommand) {
				console.log(data.raw);
			});
	};
	program
		.command('ps')
		.description('list available container')
		.option('-a, --all', 'show all container')
		.option('-q, --quiet', 'show only the container IDs')
		.action(listContainer);
	program
		.command('c')
		.description('list available container')
		.option('-a, --all', 'show all container')
		.option('-q, --quiet', 'show only the container IDs')
		.action(listContainer);
};
