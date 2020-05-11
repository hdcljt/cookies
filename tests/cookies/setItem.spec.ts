import cookies from '../../src'

describe('setItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie: key 为空', () => {
    cookies.setItem('', '123')
    expect(document.cookie).toEqual('')
  })

  it('cookie: 设置 abc 的值为 123', () => {
    cookies.setItem('abc', '123')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['abc=123']))
  })

  it('cookie: 分别设置 ABC,AbC,abc', () => {
    cookies.setItem('ABC', '100')
    cookies.setItem('AbC', '789:FLAG=1')
    cookies.setItem('abc', '789')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining(['ABC=100', `AbC=${encodeURIComponent('789:FLAG=1')}`, 'abc=789']))
  })

  it('cookie: 分别设置 AbC,AbC[1]', () => {
    cookies.setItem('AbC', '123:FLAG=1')
    cookies.setItem('AbC[1]', '100')
    expect(document.cookie.split('; ')).toEqual(expect.arrayContaining([`AbC=${encodeURIComponent('123:FLAG=1')}`, 'AbC[1]=100']))
  })

  it('cookie: 设置 abc （带有过期时间，值为 2s）', done => {
    cookies.setItem('abc1', '123', 2)
    expect(document.cookie).toEqual('abc1=123')
    setTimeout(() => {
      expect(document.cookie).toEqual('')
      done()
    }, 2e3)
  }, 3e3)

  it('cookie: 检查设置 abc 的返回内容（过期时间值为时间戳）', () => {
    const date = new Date(Date.now() + 864e5)
    expect(cookies.setItem('abc3', '123', date.getTime())).toEqual(`abc3=123; Expires=${date.toUTCString()}`)
  })

  it('cookie: 设置 abc （过期时间为 dateString 格式的字符串）', () => {
    const date = new Date(Date.now() + 864e5)
    expect(cookies.setItem('abc2', '123', date.toUTCString())).toEqual(`abc2=123; Expires=${date.toUTCString()}`)
  })

  it('cookie: 设置 abc （过期时间为无效的字符串形式）', () => {
    expect(cookies.setItem('abc2', '123', 'asdf')).toEqual('abc2=123')
  })

  it('cookie: 设置 abc （带有 path 属性）', () => {
    expect(cookies.setItem('abc4', '123', '', '/')).toEqual('abc4=123; Path=/')
  })

  it('cookie: 设置 abc （带有 domain 属性）', () => {
    expect(cookies.setItem('abc5', '123', '', '', 'example.com')).toEqual('abc5=123; Domain=example.com')
  })

  it('cookie: 设置 abc （带有 secure 属性）', () => {
    expect(cookies.setItem('abc6', '123', '', '', '', true)).toEqual('abc6=123; Secure')
  })

  it('cookie: 设置 abc （带有 sameSite 属性）', () => {
    expect(cookies.setItem('abc7', '123', '', '', '', false, 'None')).toEqual('abc7=123; SameSite=None')
  })
})
