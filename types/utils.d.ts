declare function getItem(key: string): string;
declare function setItem(key: string, value: string, expires?: string | number, path?: string, domain?: string, secure?: boolean, sameSite?: 'None' | 'Strict' | 'Lax'): string;
declare function removeItem(key: string): void;
declare function clear(): void;
declare function hasItem(key: string): boolean;
declare function keys(): string[];
declare function length(): number;
export { getItem, setItem, removeItem, clear, hasItem, keys, length };
