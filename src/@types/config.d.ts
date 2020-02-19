export interface Config {
	// show the resulting command before executing it
	showCommand?: boolean;
	// which command mapping is used if no command is provided
	default: string;
	// the abbreviation is the property name
	commandMappings: {
		[commandMappings: string]: {
			// the full command name
			command: string;
			// which action is executed by default
			default: string;
			// the fist value is the abbreviation and the second the full action
			actionMappings: [string, string][];
		};
	};
}
