export interface Config {
	showCommand?: boolean;
	default: string;
	commandMappings: {
		[commandMappings: string]: {
			command: string;
			default: string;
			actionMappings: [string, string][];
		};
	};
}
