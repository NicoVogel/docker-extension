#!/usr/bin/env node

import * as program from 'commander';
import { Docker, Options } from 'docker-cli-js';
import { setupImageCommands } from './images';

const options = new Options(undefined, __dirname);
const docker = new Docker(options);

program.version('0.0.1');
setupImageCommands(program, docker);

// allow commander to parse `process.argv`
program.parse(process.argv);
