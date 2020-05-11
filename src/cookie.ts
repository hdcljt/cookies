import { get, set, deleteProperty, has, ownKeys, ObjType } from './proxy'

const cookie: ObjType = new Proxy(Object.create(null), {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
})

export default cookie
