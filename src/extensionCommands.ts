import { configLocation, configWriter } from './configHandler';

export const evalExtensionCommand = (args: string[], processArgs: string[]) => {
	if (!args || args.length === 0 || args[0] === 'help') {
		console.log(
			`Docker Extension specific commands:
    help:           show which commands are availiabe
    get-config:     get the config path
    save-config:    override the config with a file
`
		);
		return;
	}

	if (args[0] === 'get-config') {
		console.log(configLocation);
		return;
	}

	if (args[0] === 'save-config') {
		if (args.length === 1) {
			console.log(
				'You need to specify a file which will be used as new config'
			);
		}
		configWriter(args[1], process.cwd());
		return;
	}
};
