#!/usr/bin/env node

import * as program from 'commander';
import { Docker, Options } from 'docker-cli-js';
import { setupImageCommands } from './images';
import { setupContainerCommands } from './container';
import { setupNetworkCommands } from './network';

const options = new Options(undefined, __dirname);
const docker = new Docker(options);

program.version('0.0.1').description('shorten and extend the docker commands');
setupImageCommands(program, docker);
setupContainerCommands(program, docker);
setupNetworkCommands(program, docker);

// allow commander to parse `process.argv`
program.parse(process.argv);
