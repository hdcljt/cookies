declare const cookies: {
    getItem(key: string): string;
    setItem(key: string, value: string, expires?: string | number, path?: string, domain?: string, secure?: boolean, sameSite?: "None" | "Strict" | "Lax"): string;
    removeItem(key: string): void;
    clear(): void;
    hasItem(key: string): boolean;
    readonly keys: string[];
    readonly length: number;
};
export default cookies;
