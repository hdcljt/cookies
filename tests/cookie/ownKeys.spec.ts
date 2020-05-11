import { cookie } from '../../src'

describe('proxy -> has', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie 为空', () => {
    expect(Object.getOwnPropertyNames(cookie)).toEqual(expect.arrayContaining([]))
  })

  it('cookie: 存在 abc', () => {
    document.cookie = 'abc=123'
    expect(Object.getOwnPropertyNames(cookie)).toEqual(expect.arrayContaining(['abc']))
  })

  it('cookie: 存在 ABC,AbC,abc', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(Object.getOwnPropertyNames(cookie)).toEqual(expect.arrayContaining(['abc', 'ABC', 'AbC']))
  })

  it('cookie: 存在 AbC[1],AbC', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    expect(Object.getOwnPropertyNames(cookie)).toEqual(expect.arrayContaining(['AbC[1]', 'AbC']))
  })

  it('cookie: 存在 AbC[1],AbC', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    console.log('xxxxxxxxxxxx')
    for (const key in cookie) {
      console.log(key)
      expect(['AbC[1]', 'AbC']).toContain(key)
    }
  })
})
