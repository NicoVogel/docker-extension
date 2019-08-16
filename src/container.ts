import { exec } from 'child_process';
import { CommanderStatic } from 'commander';

const listContainer = (options: any): void => {
	exec(
		`docker ps ${options.all ? '-a' : ''} ${options.quiet ? '-q' : ''} `,
		(error, stdout, stderr) => {
			console.log(stdout);
		}
	);
};

export const setupContainerCommands = (program: CommanderStatic): void => {
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
