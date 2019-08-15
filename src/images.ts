import { CommanderStatic } from 'commander';
import { Docker } from 'docker-cli-js';
import { ImageCommand } from './model/docker-cli-js';

export const setupImageCommands = (
	program: CommanderStatic,
	docker: Docker
): void => {
	program
		.command('image')
		.alias('i')
		.description('list available images')
		.action(() => {
			docker.command('images').then(function(data: ImageCommand) {
				console.log(data.raw);
			});
		});
};
