import { exec } from 'child_process';
import { CommanderStatic } from 'commander';

export const setupImageCommands = (program: CommanderStatic): void => {
	program
		.command('image')
		.alias('i')
		.description('list available images')
		.action(() => {
			exec('docker images', (error, stdout, stderr) => {
				console.log(stdout);
			});
		});
};
