import { cookie } from '../../src'

describe('proxy -> get', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: 不存在 abc', () => {
    expect(cookie.abc).toEqual('')
  })

  it('cookie: abc 值为 123', () => {
    document.cookie = 'abc=123'
    // cookie.abc = '123'
    expect(cookie.abc).toEqual('123')
  })

  it('cookie: AbC 值为 123:FLAG=1', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    // cookie.ABC = '100'
    // cookie.AbC = '789:FLAG=1'
    // cookie.abc = '789'
    expect(cookie.AbC).toEqual('789:FLAG=1')
    expect(cookie.ABC).toEqual('100')
    expect(cookie.abc).toEqual('789')
  })

  it('cookie: AbC[1] 值为 100', () => {
    document.cookie = 'AbC=123:FLAG=1'
    document.cookie = 'AbC[1]=100'
    // cookie['AbC'] = '123:FLAG=1'
    // cookie['AbC[1]'] = '100'
    expect(cookie['AbC[1]']).toEqual('100')
    expect(cookie['AbC']).toEqual('123:FLAG=1')
  })

  it('cookie: 存在 ABC,AbC,abc', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=456:FLAG=1'
    document.cookie = 'abc=234'
    // cookie.ABC = '100'
    // cookie.AbC = '456:FLAG=1'
    // cookie.abc = '234'
    expect(cookie.keys).toEqual(expect.arrayContaining(['ABC', 'AbC', 'abc']))
  })

  it('cookie: 长度为 3', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=456:FLAG=1'
    document.cookie = 'abc=234'
    // cookie.ABC = '100'
    // cookie.AbC = '456:FLAG=1'
    // cookie.abc = '234'
    expect(cookie.length).toEqual(3)
  })
})
