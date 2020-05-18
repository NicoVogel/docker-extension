import { configLocation, configWriter } from './configHandler';

const helpLog = () => {
	console.log(
		`Docker Extension specific commands:
help:           show which commands are availiabe
get-config:     get the config path
save-config:    override the config with a file
version:		get the version number of the current build
`
	);
}

const saveLog = (args: string[]) => {
	if (args.length === 1) {
		console.log(
			'You need to specify a file which will be used as new config'
		);
		return;
	}
	configWriter(args[1], process.cwd());
}

export const evalExtensionCommand = (args: string[], processArgs: string[]) => {
	if (!args || args.length === 0) {
		helpLog();
		return;
	}

	switch (args[0]) {
		case 'get-config':
			console.log(configLocation);
			break;
		case 'version':
			console.log('docker-extension version:$PACKAGE_VERSION');
			break;
		case 'save-config':
			saveLog(args);
			break;
		case 'help':
			helpLog();
			break;
		default:
			console.error(`Unknown command: ${args[0]}`)
			helpLog();
			break;
	}
};
