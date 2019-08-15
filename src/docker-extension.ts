#!/usr/bin/env node

import { spawn } from 'child_process';
import * as program from 'commander';

program.version('0.0.1');
program
	.command('images')
	.alias('i')
	.description('equivalent to "docker images"')
	.action(() => {
		const dockerImages = spawn('docker', ['images']);
		let output = '';
		dockerImages.stdout.on('data', data => {
			output = `${output}${data}`;
		});
		dockerImages.on('close', () => {
			console.log(output);
		});
	});

// allow commander to parse `process.argv`
program.parse(process.argv);
