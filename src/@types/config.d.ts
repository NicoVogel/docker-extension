export interface Config {
    [abbrev: string]: {
        command: string,
        default: string,
        mappings: [{ abbrev: string, action: string }]
    }
}