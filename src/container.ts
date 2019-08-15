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
		.action(() => {
			docker.command('ps').then(function(data: ContainerCommand) {
				console.log(data.raw);
			});
		});
};
