export interface Config {
	showCommand?: boolean;
	abbrev: {
		[abbrev: string]: {
			command: string;
			default: string;
			mappings: [string, string][];
		};
	};
}
