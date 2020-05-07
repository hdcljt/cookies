import cookies from '../src/cookies'

describe('keys', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('cookie is empty', () => {
    expect(cookies.keys).toEqual([])
  })

  it('keys abc', () => {
    document.cookie = 'abc=123'
    expect(cookies.keys).toEqual(expect.arrayContaining(['abc']))
  })

  it('keys ABC,AbC,abc', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(cookies.keys).toEqual(expect.arrayContaining(['abc', 'ABC', 'AbC']))
  })

  it('keys AbC[1],AbC', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    expect(cookies.keys).toEqual(expect.arrayContaining(['AbC', 'AbC[1]']))
  })
})
