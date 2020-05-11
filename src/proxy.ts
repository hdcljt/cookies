
import { length, keys, getItem, setItem, removeItem, hasItem } from './utils'

type SetType = string | {
  value: string;
  expires?: number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'None' | 'Strict' | 'Lax';
}
export type ObjType = Record<string, string | SetType>

function get (target: ObjType, key: string): string | string[] | number {
  // let value: number | string | string[] = Reflect.get(target, key)
  // if (typeof value === 'string') return value
  let value: number | string | string[] = ''
  switch (key) {
    case 'length': value = length(); break
    case 'keys': value = keys(); break
    default: value = getItem(key as string)
  }
  Reflect.set(target, key, value)
  return value
}

function set (target: ObjType, key: string, val: SetType): boolean {
  if (typeof val === 'string') return Reflect.set(target, key, setItem(key as string, val))
  const { value, expires, path, domain, secure, sameSite } = val
  return Reflect.set(target, key, setItem(key as string, value, expires, path, domain, secure, sameSite))
}

function deleteProperty (target: ObjType, key: string): boolean {
  removeItem(key as string)
  return Reflect.deleteProperty(target, key)
}

function has (target: ObjType, key: string): boolean {
  return hasItem(key as string)
}

function ownKeys (target: ObjType): string[] {
  return keys()
}

export {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}
