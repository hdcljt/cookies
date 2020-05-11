
function getItem (key: string): string {
  return key ? decodeURIComponent((`; ${document.cookie}`.split(`; ${key}=`)[1] || '').split(';')[0]) : ''
}

function setItem (key: string, value: string, expires?: string | number, path?: string, domain?: string, secure?: boolean, sameSite?: 'None'|'Strict'|'Lax'): string {
  if (!key) return ''

  const cookie = []
  cookie.push(`${key}=${encodeURIComponent(value)}`)

  let strExpires = ''
  if (typeof expires === 'number' && expires < 1e9) {
    strExpires = new Date(Date.now() + expires * 1e3).toUTCString()
  } else if (expires) {
    const d = new Date(expires)
    strExpires = isNaN(d.getTime()) ? '' : d.toUTCString()
  }
  strExpires && cookie.push(`Expires=${strExpires}`)

  path && cookie.push(`Path=${path}`)
  domain && cookie.push(`Domain=${domain}`)
  secure === true && cookie.push('Secure')
  sameSite && ['None','Strict','Lax'].includes(sameSite) && cookie.push(`SameSite=${sameSite}`)

  const result = cookie.join('; ')
  document.cookie = result
  return result
}

function removeItem (key: string) {
  key && setItem(key, '', -1)
}

function clear () {
  keys().forEach(removeItem)
}

function hasItem (key: string): boolean {
  return key ? `; ${document.cookie}`.includes(`; ${key}=`) : false
}

function keys (): string[] {
  const str = document.cookie.replace(/(?:=[^;]*)/g, '')
  return str ? str.split('; ') : []
}

function length (): number {
  return document.cookie ? document.cookie.split(';').length : 0
}

export {
  getItem,
  setItem,
  removeItem,
  clear,
  hasItem,
  keys,
  length
}
