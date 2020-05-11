let result = ''
jest.mock('../../src/utils', () => ({
  setItem: function (key: string, value: string, expires?: string | number, path?: string, domain?: string, secure?: boolean, sameSite?: "None" | "Strict" | "Lax") {
    if (!key) return result = ''

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
  
    result = cookie.join('; ')
    document.cookie = result
    return result
  }
}))
import { cookie } from '../../src'

describe('proxy -> set', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: key 为空', () => {
    cookie[''] = '123'
    expect(document.cookie).toEqual('')
  })

  it('cookie: 设置 abc 的值为 123', () => {
    cookie.abc = '123'
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['abc=123']))
  })

  it('cookie: 分别设置 ABC,AbC,abc', () => {
    cookie.ABC = '100'
    cookie.AbC = '789:FLAG=1'
    cookie.abc = '789'
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['ABC=100', `AbC=${encodeURIComponent('789:FLAG=1')}`, 'abc=789']))
  })

  it('cookie: 分别设置 AbC,AbC[1]', () => {
    cookie['AbC'] = '123:FLAG=1'
    cookie['AbC[1]'] = '100'
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining([`AbC=${encodeURIComponent('123:FLAG=1')}`, 'AbC[1]=100']))
  })

  it('cookie: 设置 abc1 （带有过期时间，值为 2s）', done => {
    cookie.abc1 = { value: '123', expires: 2 }
    expect(document.cookie).toEqual('abc1=123')
    setTimeout(() => {
      expect(document.cookie).toEqual('')
      done()
    }, 2e3)
  }, 3e3)

  it('cookie: 检查设置 abc2 的返回内容（过期时间值为时间戳）', () => {
    const date = new Date(Date.now() + 864e5)
    cookie.abc2 = { value: '123', expires: date.getTime() }
    expect(result).toEqual(`abc2=123; Expires=${date.toUTCString()}`)
  })

  it('cookie: 设置 abc3 （过期时间为 dateString 格式的字符串）', () => {
    const date = new Date(Date.now() + 864e5)
    cookie.abc3 = { value: '123', expires: date.toUTCString() }
    expect(result).toEqual(`abc3=123; Expires=${date.toUTCString()}`)
  })

  it('cookie: 设置 abc4 （过期时间为无效的字符串形式）', () => {
    cookie.abc4 = { value: '123', expires: 'asdf' }
    expect(result).toEqual('abc4=123')
  })

  it('cookie: 设置 abc5 （带有 path 属性）', () => {
    cookie.abc5 = { value: '123', path: '/' }
    expect(result).toEqual('abc5=123; Path=/')
  })

  it('cookie: 设置 abc6 （带有 domain 属性）', () => {
    cookie.abc6 = { value: '123', domain: 'example.com' }
    expect(result).toEqual('abc6=123; Domain=example.com')
  })

  it('cookie: 设置 abc7 （带有 secure 属性）', () => {
    cookie.abc7 = { value: '123', secure: true }
    expect(result).toEqual('abc7=123; Secure')
  })

  it('cookie: 设置 abc8 （带有 sameSite 属性）', () => {
    cookie.abc8 = { value: '123', sameSite: 'None' }
    expect(result).toEqual('abc8=123; SameSite=None')
  })
})
