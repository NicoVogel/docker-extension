export interface Config {
	// show the resulting command before executing it
	showCommand?: boolean;
	// which command mapping is used if no command is provided (has to be the abbreviation)
	default: string;
	// the abbreviation is the property name
	commandMappings: {
		[commandMappings: string]: {
			// the full command name
			command: string;
			// which action is executed by default (has to be any full action)
			default: string;
			// the fist value is the abbreviation and the second the full action
			actionMappings: [string, string][];
		};
	};
	// custom defined commands
	customCommandMappings?: {
		// The property name is the command name
		// The value is a docker command with placeholders
		[commandMapping: string]: string;
	};
	// open in editor command, needs to contain one placeholder $0 for the config file path
	openEditorCommand: string;
}
