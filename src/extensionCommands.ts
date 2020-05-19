import { configLocation, configWriter, getConfig } from './configHandler';
import { customRunner } from './runner';

export const evalExtensionCommand = (args: string[], processArgs: string[]) => {
	if (!args || args.length === 0 || args[0] === 'help') {
		console.log(
			`Docker Extension specific commands:
    help:           show which commands are available
    get-config:     get the config path
	save-config:    override the config with a file:
	edit:			open config in editor, can be configured in config
	version:		get the version number of the current build
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

	if (args[0] === 'edit') {
		const openEditorCommand = getConfig().openEditorCommand.replace('$0', configLocation);
		customRunner(openEditorCommand);
		console.log('opening editor')
		return;
	}

	if (args[0] === 'version') {
		console.log(`docker-extension version: ${__VERSION__}`);
		return;
	}
};