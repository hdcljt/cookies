import cookies from '../src/cookies'

describe('clear', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('clear abc', () => {
    const items = ['abc=123']
    items.forEach(v => document.cookie = v)
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(items))
    cookies.clear()
    expect(document.cookie).toBeFalsy()
  })

  it('clear ABC,AbC,abc', () => {
    const items = ['ABC=100', 'AbC=789:FLAG=1', 'abc=789']
    items.forEach(v => document.cookie = v)
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(items))
    cookies.clear()
    expect(document.cookie).toBeFalsy()
  })

  it('clear AbC,AbC[1]', () => {
    const items = ['AbC=123:FLAG=1', 'AbC[1]=100']
    items.forEach(v => document.cookie = v)
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(items))
    cookies.clear()
    expect(document.cookie).toBeFalsy()
  })
})
