import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { defaultConfig } from './defaultConfig';
import { Config } from './@types/config';



const configLoader = (processUrl: string): Config => {
	try {
		const installLocation = dirname(processUrl);
		const configLocation = join(
			installLocation,
			'./.config/docker-extension.json'
		);
		if (existsSync(configLocation) === false) {
			try {
				mkdirSync(dirname(configLocation), { recursive: true });
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
		console.error(`Problem while managing the config file! ${err.message}`);
	}
	return defaultConfig;
};

let config: Config;

export const getConfig = (): Config => {
	if (!config) {
		config = configLoader(process.argv[1]);
	}
	return config;
}