import cookies from '../src/cookies'

describe('getItem', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('key is empty', () => {
    expect(cookies.getItem('')).toEqual('')
  })

  it('abc is not exists', () => {
    expect(cookies.getItem('abc')).toEqual('')
  })

  it('abc is equal 123', () => {
    document.cookie = 'abc=123'
    expect(cookies.getItem('abc')).toEqual('123')
  })

  it('AbC is equal 123:FLAG=1', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(cookies.getItem('AbC')).toEqual('789:FLAG=1')
    expect(cookies.getItem('ABC')).toEqual('100')
    expect(cookies.getItem('abc')).toEqual('789')
  })

  it('AbC[1] is equal 100', () => {
    document.cookie = 'AbC=123:FLAG=1'
    document.cookie = 'AbC[1]=100'
    expect(cookies.getItem('AbC[1]')).toEqual('100')
    expect(cookies.getItem('AbC')).toEqual('123:FLAG=1')
  })
})
