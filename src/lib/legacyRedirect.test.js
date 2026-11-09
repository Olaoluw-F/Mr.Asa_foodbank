import { describe, expect, it } from 'vitest'
import { legacyRedirect } from './legacyRedirect'

describe('legacyRedirect', () => {
  it('sends old v1 hash links to the new pages', () => {
    expect(legacyRedirect('/', '#home')).toBe('/')
    expect(legacyRedirect('/', '#food')).toBe('/food')
    expect(legacyRedirect('/', '#volunteer')).toBe('/volunteer')
    expect(legacyRedirect('/', '#donate')).toBe('/donate')
    expect(legacyRedirect('/', '#umd')).toBe('/umd')
    expect(legacyRedirect('/', '#about')).toBe('/about')
    expect(legacyRedirect('/', '#africa')).toBe('/donate#africa')
    expect(legacyRedirect('/', '#faq')).toBe('/about#faq')
  })

  it('handles /index.html, where v1 also lived', () => {
    expect(legacyRedirect('/index.html', '#umd')).toBe('/umd')
    expect(legacyRedirect('/index.html', '')).toBe('/')
  })

  it('sends unknown hashes Home, like v1', () => {
    expect(legacyRedirect('/', '#nope')).toBe('/')
  })

  it('leaves new URLs alone', () => {
    expect(legacyRedirect('/', '')).toBeNull()
    expect(legacyRedirect('/donate', '#africa')).toBeNull()
    expect(legacyRedirect('/about', '#faq')).toBeNull()
    expect(legacyRedirect('/food', '')).toBeNull()
  })
})
