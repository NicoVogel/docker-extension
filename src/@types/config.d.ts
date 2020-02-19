export interface Config {
	showCommand?: boolean;
	default: string;
	abbrev: {
		[abbrev: string]: {
			command: string;
			default: string;
			mappings: [string, string][];
		};
	};
}
