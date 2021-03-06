import * as open from 'open';
import { configLocation, configWriter } from './configHandler';

const helpLog = () =>
	console.log(
		`Docker Extension specific commands:

	help:           show which commands are available
	get-config:     get the config path
	save-config:    override the config with a file:
	edit:			open config in editor, can be configured in config
	version:		get the version number of the current build
`
	);

const saveConfig = (args: string[]) => {
	if (args.length === 1) {
		console.log('You need to specify a file which will be used as new config');
	}
	configWriter(args[1], process.cwd());
};

const editConfig = () => {
	open(configLocation);
	console.log('Opening editor');
};

export const evalExtensionCommand = (args: string[], processArgs: string[]) => {
	if (!args || args.length === 0) {
		helpLog();
		return;
	}

	switch (args[0]) {
		case 'help':
			helpLog();
			break;
		case 'get-config':
			console.log(configLocation);
			break;
		case 'save-config':
			saveConfig(args);
			break;
		case 'edit':
			editConfig();
			break;
		case 'version':
			console.log(`docker-extension version: ${__VERSION__}`);
			break;
		default:
			console.log(`Unknown command: ${args[0]}`);
			helpLog();
			break;
	}
};
