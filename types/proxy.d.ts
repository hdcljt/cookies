declare type SetType = string | {
    value: string;
    expires?: number | string;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'None' | 'Strict' | 'Lax';
};
export declare type ObjType = Record<string, SetType>;
declare function get(target: ObjType, key: string): string | string[] | number;
declare function set(target: ObjType, key: string, val: SetType): boolean;
declare function deleteProperty(target: ObjType, key: string): boolean;
declare function has(target: ObjType, key: string): boolean;
declare function ownKeys(target: ObjType): string[];
export { get, set, deleteProperty, has, ownKeys };
