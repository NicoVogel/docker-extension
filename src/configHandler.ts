import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { defaultConfig } from './defaultConfig';
import { Config } from './@types/config';
import { Caller } from './@types/model';
import { HelperCaller } from './helperCaller';

const getConfig = (processUrl: string): Config => {
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

const generateCallers = (config: Config): Map<string, Caller> => {
	const callers: Map<string, Caller> = new Map();

	for (const key in config.commandMappings) {
		if (config.commandMappings.hasOwnProperty(key)) {
			const data = config.commandMappings[key];
			const caller = new HelperCaller(
				data.command,
				new Map(data.actionMappings),
				data.default,
				config.showCommand
			);
			callers.set(key, caller);
		}
	}

	return callers;
};

export const getCallers = (): {
	callers: Map<string, Caller>;
	config: Config;
} => {
	const config = getConfig(process.argv[1]);
	try {
		return { callers: generateCallers(config), config };
	} catch (error) {
		console.warn(
			`Unable to generate callers from config. The defaultConfig is used instead. Message: ${error.message}`
		);
		return { callers: generateCallers(defaultConfig), config: defaultConfig };
	}
};

export const getDefaultCaller = (
	callers: Map<string, Caller>,
	config: Config
): Caller => {
	const defaultCaller = callers.get(config.default);
	if (defaultCaller === undefined) {
		console.warn(
			`The default option with the abbreviation '${config.default}' does not have a mapping! the first mapping is now the default`
		);
		return callers.values().next().value;
	}
	return defaultCaller;
};
