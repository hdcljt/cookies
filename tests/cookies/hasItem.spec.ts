import cookies from '../../src'

describe('hasItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: key 为空字符串', () => {
    document.cookie = 'abc=123'
    expect(cookies.hasItem('')).toBe(false)
  })

  it('cookie 中存在 abc', () => {
    document.cookie = 'abc=123'
    expect(cookies.hasItem('abc')).toBe(true)
  })

  it('cookie 中存在 ABC,AbC,abc', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(cookies.hasItem('ABC')).toBe(true)
    expect(cookies.hasItem('AbC')).toBe(true)
    expect(cookies.hasItem('abc')).toBe(true)
  })

  it('cookie 中存在 AbC[1],AbC', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    expect(cookies.hasItem('AbC[1]')).toBe(true)
    expect(cookies.hasItem('AbC')).toBe(true)
  })
})
