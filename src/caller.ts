import { Call } from "./@types/model";
import { Config } from "./@types/config";
import { getConfig } from "./configHandler";
import { defaultConfig } from "./defaultConfig";
import { runner, customRunner } from "./runner";
import { removeFirstItem } from "./removeItem";

interface CustomCallerTemplate {
  [replaceValue: string]: string;
}

class CustomCaller implements Call {
  constructor(private template: string) { }
  invoke(args: string[]): void {
    const templateValues = {} as CustomCallerTemplate;
    for (let i = 0; i < args.length; i++) {
      templateValues[`$${i}`] = args[i];
    }
    const execCommand = this.template.replace(/\$\d/g,
      (all) => templateValues[all] || all);
    customRunner(execCommand);
  }
}

class Caller implements Call {
  constructor(
    private command: string,
    private maps: Map<string, string>,
    private defaultAction: string
  ) { }
  invoke(args: string[]): void {
    let passArgs = args;
    const firstArg = passArgs[0];
    const firstArgIsFlag = firstArg !== undefined && firstArg.startsWith("-");

    // check if a action is given if its a flag
    let action =
      firstArg === undefined || firstArgIsFlag
        ? this.defaultAction
        : this.maps.get(firstArg);

    if (action === undefined) {
      // could not find a mapping for the action. expect it is not a shorting and the actual action
      action = firstArg;
    }
    if (!firstArgIsFlag) {
      // remove action which is passes as a separate command
      passArgs = removeFirstItem(passArgs);
    }
    runner(
      this.command, action, passArgs
    );
  }
}


const generateCallers = (config: Config): Map<string, Call> => {
  const callers: Map<string, Call> = new Map();

  for (const key in config.commandMappings) {
    if (config.commandMappings.hasOwnProperty(key)) {
      const data = config.commandMappings[key];
      const caller = new Caller(
        data.command,
        new Map(data.actionMappings),
        data.default
      );
      callers.set(key, caller);
    }
  }

  return callers;
};


const generateCustomCallers = (config: Config): Map<string, Call> => {
  const callers: Map<string, Call> = new Map();

  for (const key in config.customCommandMappings) {
    if (config.customCommandMappings.hasOwnProperty(key)) {
      callers.set(key, new CustomCaller(config.customCommandMappings[key]));
    }
  }

  return callers;
};

const getCallers = (): {
  callers: Map<string, Call>;
  defaultCaller: Call;
  customCallers: Map<string, Call>;
} => {
  let callers: Map<string, Call>;
  let config = getConfig();
  try {
    callers = generateCallers(config);
  } catch (error) {
    console.warn(`Unable to generate callers from config. The defaultConfig is used instead. Message: ${error.message}`);
    callers = generateCallers(defaultConfig);
    config = defaultConfig;
  }
  let defaultCaller = callers.get(config.default);
  if (defaultCaller === undefined) {
    console.warn(`The default option with the abbreviation '${config.default}' does not have a mapping! the first mapping is now the default`);
    defaultCaller = callers.values()
      .next().value;
  }

  return {
    callers,
    defaultCaller: defaultCaller as Call,
    customCallers: generateCustomCallers(getConfig())
  };
};

export { CustomCaller, Caller, getCallers };
