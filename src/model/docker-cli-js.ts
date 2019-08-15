export interface BaseCommand {
	command: string;
	raw: string;
}

export interface ImageData {
	repository: string;
	tag: string;
	'image id': string;
	created: string;
	'virtual size': string;
}

export interface ImageCommand extends BaseCommand {
	images: ImageData[];
}

export interface ContainerData {
	containerId: string;
	image: string;
	command: string;
	created: string;
	status: string;
	ports: string;
	name: string;
}

export interface ContainerCommand extends BaseCommand {
	containerList: ContainerData[];
}

export interface BuildCommand extends BaseCommand {
	success: boolean;
	imageId: string;
	response: string[];
}

export interface NetworkData {
	'network id': string;
	name: string;
	driver: string;
}

export interface NetworkCommand extends BaseCommand {
	network: NetworkData[];
}
