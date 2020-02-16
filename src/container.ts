import { HelperCaller } from './helper';

const mappings: Map<string, string> = new Map();
mappings.set('p', 'prune');
mappings.set('e', 'exec');

export const container = new HelperCaller('container', 'c', mappings);
