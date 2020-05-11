import { cookie } from '../../src'

describe('proxy -> has', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: 不存在 abc', () => {
    expect('abc' in cookie).toBe(false)
  })

  it('cookie: 存在 abc', () => {
    document.cookie = 'abc=123'
    expect('abc' in cookie).toBe(true)
  })

  it('cookie: 存在 ABC,AbC,abc', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect('ABC' in cookie).toBe(true)
    expect('AbC' in cookie).toBe(true)
    expect('abc' in cookie).toBe(true)
  })

  it('cookie: 存在 AbC[1],AbC', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    expect('AbC[1]' in cookie).toBe(true)
    expect('AbC' in cookie).toBe(true)
  })
})
