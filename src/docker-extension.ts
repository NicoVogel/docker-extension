#!/usr/bin/env node

import * as program from 'commander';
import { setupImageCommands } from './images';
import { setupContainerCommands } from './container';
import { setupNetworkCommands } from './network';

program.version('0.0.2').description('shorten and extend the docker commands');
setupImageCommands(program);
setupContainerCommands(program);
setupNetworkCommands(program);

// allow commander to parse `process.argv`
program.parse(process.argv);
