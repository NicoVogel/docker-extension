interface IBaseInformation {
	readonly name: string;
	readonly abbreviation: string;
	readonly description: string;
}

export interface IFlag extends IBaseInformation {
	readonly required: boolean;
}

export interface ICallOptions {
	readonly parameters: IFlag[];
	readonly command: ICommand;
	readonly chainedCommand: ICommand;
}

export interface ICall {
	call(options: ICallOptions): void;
}

export interface ICommand extends IBaseInformation {
	readonly action: ICall;
	readonly chain: ICommand[];
}

/**
 * the command builder is used to create commands by chaining the different properties
 *
 * @export
 * @interface ICommandBuilder
 */
export interface ICommandBuilder {
	/**
	 * finish build process of a command.
	 *
	 * @returns {ICommand}
	 * @memberof ICommandBuilder
	 */
	build(): ICommand;
	/**
	 * add a description for the command
	 *
	 * @param {string} description
	 * @returns {ICommandBuilder}
	 * @memberof ICommandBuilder
	 */
	description(description: string): ICommandBuilder;
	/**
	 * define action which will be called for this command. Can only be set once. The others will be ignored
	 *
	 * @param {ICall} callback
	 * @returns {ICommandBuilder}
	 * @memberof ICommandBuilder
	 */
	action(callback: ICall): ICommandBuilder;
	/**
	 * define a command which follows the current command. If you chain commands with the same name, the first one will be used
	 *
	 * @example "docker network ls" the "ls" command is chained to the "network" command
	 * @param {ICommand} command
	 * @returns {ICommandBuilder}
	 * @memberof ICommandBuilder
	 */
	chain(command: ICommand): ICommandBuilder;
}

export interface ICli {
	/**
	 * create a new command
	 *
	 * @param {string} name full name of the command
	 * @param {(string | undefined)} abbreviation short name of the command (only the first letter will be used)
	 * @returns {ICommandBuilder}
	 * @memberof ICli
	 */
	command(name: string, abbreviation: string | undefined): ICommandBuilder;
	/**
	 * execute cli with parameters
	 * @param args process args
	 */
	exec(args: string[]): void;
}
