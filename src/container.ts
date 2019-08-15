import { CommanderStatic } from 'commander';
import { Docker } from 'docker-cli-js';
import { ContainerCommand } from './model/docker-cli-js';

export const setupContainerCommands = (
	program: CommanderStatic,
	docker: Docker
): void => {
	program
		.command('ps')
		.description('list available images')
		.option('-a, --all', 'show all container')
		.option('-q, --quiet', 'show only the container IDs')
		.action((options: any) => {
			docker
				.command(`ps ${options.all ? '-a' : ''} ${options.quiet ? '-q' : ''} `)
				.then(function(data: ContainerCommand) {
					console.log(data.raw);
				});
		});
};
