import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import lse from '../src/index'

const executeAfterOneHour = func => {
  setTimeout(func, 1000 * 3600)
}

describe('expirable localStorage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('length', () => {
    lse.clear()
    expect(lse.length).toBe(0)
    lse.set('key1', 1)
    expect(lse.length).toBe(1)
    lse.clear()
    expect(lse.length).toBe(0)
  })

  it('set and get', () => {
    lse.set('key', 1)
    expect(lse.getItem('key')).toBe(JSON.stringify(1))

    lse.set('key', 123, 3599)
    expect(JSON.parse(lse.getItem('key'))).toHaveProperty('value')
    expect(JSON.parse(lse.getItem('key'))).toHaveProperty('@@EXPIRE_AT')
    expect(lse('key')).toBe(123)
    expect(JSON.parse(lse.getItem('key')).value).toBe(123)
    executeAfterOneHour(() => {})
    vi.runAllTimers()
    expect(lse('key')).toBeNull()

    lse.clear()
    lse.setItem('key', '[asdf]')
    expect(lse.get('key')).toBe('[asdf]')
  })
})
