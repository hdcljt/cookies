import cookies from '../../src'

const hasItem = (key: string) => `; ${document.cookie}`.includes(`; ${key}=`)

describe('removeItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: key 为空', () => {
    document.cookie = 'abc=123'
    cookies.removeItem('')
    expect(hasItem('abc')).toBe(true)
  })

  it('cookie: 删除 abc', () => {
    document.cookie = 'abc=123'
    cookies.removeItem('abc')
    expect(hasItem('abc')).toBe(false)
  })

  it('cookie: 删除 AbC', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    cookies.removeItem('AbC')
    expect(hasItem('AbC')).toBe(false)
    expect(hasItem('ABC')).toBe(true)
    expect(hasItem('abc')).toBe(true)
  })

  it('cookie: 删除 AbC[1]', () => {
    document.cookie = 'AbC=123:FLAG=1'
    document.cookie = 'AbC[1]=100'
    cookies.removeItem('AbC[1]')
    expect(hasItem('AbC[1]')).toBe(false)
    expect(hasItem('AbC')).toBe(true)
  })
})
