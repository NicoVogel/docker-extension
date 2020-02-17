import { HelperCaller } from './helper';

const mappings: Map<string, string> = new Map();
mappings.set('h', 'history');
mappings.set('i', 'inspect');

export const image = new HelperCaller('image', 'i', mappings, 'ls');
