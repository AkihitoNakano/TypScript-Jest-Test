import { parse } from 'path'
import { Utils } from '../app/Utils'

describe('Utils test suite', () => {
  beforeEach(() => {
    console.log('before each')
  })
  beforeAll(() => {
    console.log('before all')
  })

  test('first test', () => {
    const result = Utils.toUpperCase('abc')
    expect(result).toBe('ABC')
  })

  test('parse simple URL', () => {
    const parseUrl = Utils.parseUrl('http://localhost:8080/login')
    expect(parseUrl.href).toBe('http://localhost:8080/login')
    expect(parseUrl.port).toBe('8080')
    expect(parseUrl.protocol).toBe('http:')
    expect(parseUrl.query).toEqual({})
  })

  test('parse URL with query', () => {
    const parseUrl = Utils.parseUrl('http://localhost:8080/login?user=user&password=pass')
    const expectedQuery = {
      user: 'user',
      password: 'pass',
    }
    expect(parseUrl.query).toEqual(expectedQuery)
    expect(expectedQuery).toBe(expectedQuery)
  })

  test('test invalid URL', () => {
    function expectError() {
      Utils.parseUrl('')
    }
    // console.log(expectError())
    expect(expectError).toThrow('Empty url')
  })

  test('test invalid URL with arrow function', () => {
    expect(() => {
      Utils.parseUrl('')
    }).toThrow('Empty url')
  })

  test('test invalid URL with try catch', () => {
    try {
      Utils.parseUrl('')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Empty url!')
    }
  })
})
