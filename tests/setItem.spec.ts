import cookies from '../src/cookies'

describe('setItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('key is empty', () => {
    cookies.setItem('', '123')
    expect(document.cookie).toEqual('')
  })

  it('set abc', () => {
    cookies.setItem('abc', '123')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['abc=123']))
  })

  it('set ABC,AbC,abc', () => {
    cookies.setItem('ABC', '100')
    cookies.setItem('AbC', '789:FLAG=1')
    cookies.setItem('abc', '789')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['ABC=100', `AbC=${encodeURIComponent('789:FLAG=1')}`, 'abc=789']))
  })

  it('set AbC,AbC[1]', () => {
    cookies.setItem('AbC', '123:FLAG=1')
    cookies.setItem('AbC[1]', '100')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining([`AbC=${encodeURIComponent('123:FLAG=1')}`, 'AbC[1]=100']))
  })

  it('set abc with expires(number)', done => {
    cookies.setItem('abc1', '123', 2)
    expect(document.cookie).toEqual('abc1=123')
    setTimeout(() => {
      expect(document.cookie).toEqual('')
      done()
    }, 2e3)
  }, 3e3)

  it('check return value', () => {
    const date = new Date(Date.now() + 864e5)
    expect(cookies.setItem('abc3', '123', date.getTime())).toEqual(`abc3=123; Expires=${date.toUTCString()}`)
  })

  it('set abc with expires(string)', () => {
    const date = new Date(Date.now() + 864e5)
    expect(cookies.setItem('abc2', '123', date.toUTCString())).toEqual(`abc2=123; Expires=${date.toUTCString()}`)
  })

  it('set abc with expires(string)', () => {
    expect(cookies.setItem('abc2', '123', 'asdf')).toEqual('abc2=123')
  })

  it('set abc with path', () => {
    expect(cookies.setItem('abc4', '123', '', '/')).toEqual('abc4=123; Path=/')
  })

  it('set abc with domain', () => {
    expect(cookies.setItem('abc5', '123', '', '', 'example.com')).toEqual('abc5=123; Domain=example.com')
  })

  it('set abc with secure', () => {
    expect(cookies.setItem('abc6', '123', '', '', '', true)).toEqual('abc6=123; Secure')
  })

  it('set abc with sameSite', () => {
    expect(cookies.setItem('abc7', '123', '', '', '', false, 'None')).toEqual('abc7=123; SameSite=None')
  })

  // it('set abc with expires,secure,sameSite', () => {
  //   const date = new Date(Date.now() + 864e5)
  //   expect(cookies.setItem('abc', '123', date.getTime(), '', '', true, 'None')).toEqual(`abc=123; Expires=${date.toUTCString()}; Secure; SameSite=None`)
  // })

})
