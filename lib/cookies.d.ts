import { getItem, setItem, removeItem, clear, hasItem } from './utils';
declare const cookies: {
    getItem: typeof getItem;
    setItem: typeof setItem;
    removeItem: typeof removeItem;
    clear: typeof clear;
    hasItem: typeof hasItem;
    readonly keys: string[];
    readonly length: number;
};
export default cookies;
