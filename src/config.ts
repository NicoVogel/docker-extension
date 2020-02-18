import { dirname, join } from 'path';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { Config } from './@types/config';
import { sync as mkdirpSync } from 'mkdirp';

const defaultConfig: Config = {
	showCommand: true,
	abbrev: {
		c: {
			command: 'container',
			default: 'ps',
			mappings: [['p', 'prune'], ['e', 'exec']]
		},
		i: {
			command: 'image',
			default: 'ls',
			mappings: [['h', 'history'], ['i', 'inspect'], ['p', 'prune']]
		},
		n: {
			command: 'network',
			default: 'ls',
			mappings: [['p', 'prune']]
		}
	}
};

export const getConfig = (processUrl: string): Config => {
	try {
		const installLocation = dirname(processUrl);
		const configLocation = join(
			installLocation,
			'./.config/docker-extension.json'
		);
		if (existsSync(configLocation) === false) {
			try {
				mkdirpSync(dirname(configLocation));
				writeFileSync(configLocation, JSON.stringify(defaultConfig, null, 2));
			} catch (err) {
				throw new Error(
					`Unable to write default config to location ${configLocation}. Error message: ${err.message}`
				);
			}
			return defaultConfig;
		}
		try {
			return JSON.parse(readFileSync(configLocation).toString()) as Config;
		} catch (err) {
			throw new Error(
				`Unable to load and parse the the config file from location ${configLocation}. Error message: ${err.message}`
			);
		}
	} catch (err) {
		console.error(`Promblem while managing the config file! ${err.message}`);
	}
	return defaultConfig;
};
