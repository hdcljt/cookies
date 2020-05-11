import cookies from '../../src'

describe('getItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: key 为空字符串', () => {
    expect(cookies.getItem('')).toEqual('')
  })

  it('cookie: abc 不存在', () => {
    expect(cookies.getItem('abc')).toEqual('')
  })

  it('cookie: abc 值为 123', () => {
    document.cookie = 'abc=123'
    expect(cookies.getItem('abc')).toEqual('123')
  })

  it('cookie: AbC 值为 123:FLAG=1', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(cookies.getItem('AbC')).toEqual('789:FLAG=1')
    expect(cookies.getItem('ABC')).toEqual('100')
    expect(cookies.getItem('abc')).toEqual('789')
  })

  it('cookie: AbC[1] 值为 100', () => {
    document.cookie = 'AbC=123:FLAG=1'
    document.cookie = 'AbC[1]=100'
    expect(cookies.getItem('AbC[1]')).toEqual('100')
    expect(cookies.getItem('AbC')).toEqual('123:FLAG=1')
  })
})
