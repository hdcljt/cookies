import cookies from '../src/cookies'

describe('length', () => {
  afterEach(() => {
    const arr = document.cookie.split(';')
    arr.forEach(item => {
      document.cookie = `${item.split('=')[0]}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    })
  })

  it('length = 0', () => {
    expect(cookies.length).toBe(0)
  })

  it('length = 1', () => {
    document.cookie = 'abc=123'
    expect(cookies.length).toBe(1)
  })

  it('length = 3', () => {
    document.cookie = 'ABC=100'
    document.cookie = 'AbC=789:FLAG=1'
    document.cookie = 'abc=789'
    expect(cookies.length).toBe(3)
  })

  it('length = 2', () => {
    document.cookie = 'AbC[1]=100'
    document.cookie = 'AbC=123:FLAG=1'
    expect(cookies.length).toBe(2)
  })
})
