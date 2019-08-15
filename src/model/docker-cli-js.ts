export interface BaseCommand {
	command: string;
	raw: string;
}

interface ImageData {
	repository: string;
	tag: string;
	'image id': string;
	created: string;
	'virtual size': string;
}

interface ImageCommand extends BaseCommand {
	images: ImageData[];
}

interface ContainerData {
	containerId: string;
	image: string;
	command: string;
	created: string;
	status: string;
	ports: string;
	name: string;
}

interface ContainerCommand extends BaseCommand {
	containerList: ContainerData[];
}

interface BuildCommand extends BaseCommand {
	success: boolean;
	imageId: string;
	response: string[];
}

interface NetworkData {
	'network id': string;
	name: string;
	driver: string;
}

interface NetworkCommand extends BaseCommand {
	network: NetworkData[];
}

interface InspectData {
	Id: string;
	Created: string;
	Path: string;
	Args: string[];
	State: State;
	Image: string;
	ResolvConfPath: string;
	HostnamePath: string;
	HostsPath: string;
	LogPath: string;
	Name: string;
	RestartCount: number;
	Driver: string;
	Platform: string;
	MountLabel: string;
	ProcessLabel: string;
	AppArmorProfile: string;
	ExecIDs?: any;
	HostConfig: HostConfig;
	GraphDriver: GraphDriver;
	Mounts: any[];
	Config: Config2;
	NetworkSettings: NetworkSettings;
}

interface NetworkSettings {
	Bridge: string;
	SandboxID: string;
	HairpinMode: boolean;
	LinkLocalIPv6Address: string;
	LinkLocalIPv6PrefixLen: number;
	Ports: Config;
	SandboxKey: string;
	SecondaryIPAddresses?: any;
	SecondaryIPv6Addresses?: any;
	EndpointID: string;
	Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	MacAddress: string;
	Networks: Networks;
}

interface Networks {
	bridge: Bridge;
}

interface Bridge {
	IPAMConfig?: any;
	Links?: any;
	Aliases?: any;
	NetworkID: string;
	EndpointID: string;
	Gateway: string;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	MacAddress: string;
	DriverOpts?: any;
}

interface Config2 {
	Hostname: string;
	Domainname: string;
	User: string;
	AttachStdin: boolean;
	AttachStdout: boolean;
	AttachStderr: boolean;
	Tty: boolean;
	OpenStdin: boolean;
	StdinOnce: boolean;
	Env: string[];
	Cmd: string[];
	Image: string;
	Volumes?: any;
	WorkingDir: string;
	Entrypoint: string[];
	OnBuild?: any;
	Labels: Config;
}

interface GraphDriver {
	Data: Data;
	Name: string;
}

interface Data {
	LowerDir: string;
	MergedDir: string;
	UpperDir: string;
	WorkDir: string;
}

interface HostConfig {
	Binds?: any;
	ContainerIDFile: string;
	LogConfig: LogConfig;
	NetworkMode: string;
	PortBindings: Config;
	RestartPolicy: RestartPolicy;
	AutoRemove: boolean;
	VolumeDriver: string;
	VolumesFrom?: any;
	CapAdd?: any;
	CapDrop?: any;
	Capabilities?: any;
	Dns: any[];
	DnsOptions: any[];
	DnsSearch: any[];
	ExtraHosts?: any;
	GroupAdd?: any;
	IpcMode: string;
	Cgroup: string;
	Links?: any;
	OomScoreAdj: number;
	PidMode: string;
	Privileged: boolean;
	PublishAllPorts: boolean;
	ReadonlyRootfs: boolean;
	SecurityOpt?: any;
	UTSMode: string;
	UsernsMode: string;
	ShmSize: number;
	Runtime: string;
	ConsoleSize: number[];
	Isolation: string;
	CpuShares: number;
	Memory: number;
	NanoCpus: number;
	CgroupParent: string;
	BlkioWeight: number;
	BlkioWeightDevice: any[];
	BlkioDeviceReadBps?: any;
	BlkioDeviceWriteBps?: any;
	BlkioDeviceReadIOps?: any;
	BlkioDeviceWriteIOps?: any;
	CpuPeriod: number;
	CpuQuota: number;
	CpuRealtimePeriod: number;
	CpuRealtimeRuntime: number;
	CpusetCpus: string;
	CpusetMems: string;
	Devices: any[];
	DeviceCgroupRules?: any;
	DeviceRequests?: any;
	KernelMemory: number;
	KernelMemoryTCP: number;
	MemoryReservation: number;
	MemorySwap: number;
	MemorySwappiness?: any;
	OomKillDisable: boolean;
	PidsLimit?: any;
	Ulimits?: any;
	CpuCount: number;
	CpuPercent: number;
	IOMaximumIOps: number;
	IOMaximumBandwidth: number;
	MaskedPaths: string[];
	ReadonlyPaths: string[];
}

interface RestartPolicy {
	Name: string;
	MaximumRetryCount: number;
}

interface LogConfig {
	Type: string;
	Config: Config;
}

interface Config {}

interface State {
	Status: string;
	Running: boolean;
	Paused: boolean;
	Restarting: boolean;
	OOMKilled: boolean;
	Dead: boolean;
	Pid: number;
	ExitCode: number;
	Error: string;
	StartedAt: string;
	FinishedAt: string;
}

interface InspectCommand extends BaseCommand {
	object: InspectData;
}
