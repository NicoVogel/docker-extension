import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { defaultConfig } from './defaultConfig';
import { Config } from './@types/config';

export const configLocation = join(
	dirname(process.argv[1]),
	'./.config/docker-extension.json'
);

const createConfigIfNotExists = (data: Config, path: string) => {
	try {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, JSON.stringify(data, null, 2));
	} catch (err) {
		throw new Error(
			`Unable to write default config to location ${path}. Error message: ${err.message}`
		);
	}
};

export const configWriter = (file: string, currentDirectory: string): void => {
	const originLocation = file.startsWith('/')
		? file
		: join(currentDirectory, file);
	console.log(originLocation);
	try {
		if (existsSync(originLocation) === false) {
			throw new Error(
				`the passed origin file path does not exist!, passed path: ${originLocation}`
			);
		}
		let readFileData;
		try {
			readFileData = JSON.parse(readFileSync(originLocation).toString());
		} catch (err) {
			throw new Error(
				`Problem while reading the config origin! ${err.message}`
			);
		}
		createConfigIfNotExists(readFileData, configLocation);
	} catch (err) {
		console.error(
			`Problem while managing the config file! Fiel path: ${file}\nError: ${err.message}`
		);
	}
};

const configLoader = (): Config => {
	try {
		if (existsSync(configLocation) === false) {
			createConfigIfNotExists(defaultConfig, configLocation);
			return defaultConfig;
		}
		try {
			return JSON.parse(readFileSync(configLocation).toString()) as Config;
		} catch (err) {
			throw new Error(
				`Unable to load and parse the config file from location ${configLocation}. Error message: ${err.message}`
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
		config = configLoader();
	}
	return config;
};
