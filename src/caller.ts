
import { Caller } from './@types/model';
import { HelperCaller } from './helperCaller';
import { Config } from './@types/config';
import { getConfig } from './configHandler';
import { defaultConfig } from './defaultConfig';

const generateCallers = (config: Config): Map<string, Caller> => {
    const callers: Map<string, Caller> = new Map();

    for (const key in config.commandMappings) {
        if (config.commandMappings.hasOwnProperty(key)) {
            const data = config.commandMappings[key];
            const caller = new HelperCaller(
                data.command,
                new Map(data.actionMappings),
                data.default
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
    const config = getConfig();
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
