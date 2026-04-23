import { describe, it, expect } from 'vitest'
import { cn, siteUrl, formatNumber, buildWhatsAppUrl } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('joins classes', () => {
      expect(cn('a', 'b')).toBe('a b')
    })
    it('filters falsy values', () => {
      expect(cn('a', false, 'b', null, undefined)).toBe('a b')
    })
  })

  describe('siteUrl', () => {
    it('returns absolute URL', () => {
      expect(siteUrl('/test')).toContain('eaglecarrental.ae/test')
    })
  })

  describe('formatNumber', () => {
    it('formats numbers for English', () => {
      expect(formatNumber('en', 1000)).toBe('1,000')
    })
  })

  describe('buildWhatsAppUrl', () => {
    it('builds correct URL', () => {
      const url = buildWhatsAppUrl('+971 55 702 1991', 'Hello')
      expect(url).toBe('https://wa.me/971557021991?text=Hello')
    })
  })
})
