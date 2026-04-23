import { describe, it, expect } from 'vitest'
import { isLocale, localize, toLocalizedPath, oppositeLocale, formatCurrency } from './locale'

describe('locale', () => {
  describe('isLocale', () => {
    it('returns true for valid locales', () => {
      expect(isLocale('en')).toBe(true)
      expect(isLocale('ar')).toBe(true)
    })
    it('returns false for invalid locales', () => {
      expect(isLocale('fr')).toBe(false)
      expect(isLocale('')).toBe(false)
    })
  })

  describe('localize', () => {
    it('returns text for specified locale', () => {
      const text = { en: 'Hello', ar: 'مرحبا' }
      expect(localize('en', text)).toBe('Hello')
      expect(localize('ar', text)).toBe('مرحبا')
    })
  })

  describe('toLocalizedPath', () => {
    it('prefixes path with locale', () => {
      expect(toLocalizedPath('en', '/about')).toBe('/en/about')
      expect(toLocalizedPath('ar', '/contact')).toBe('/ar/contact')
    })
    it('handles root path', () => {
      expect(toLocalizedPath('en', '/')).toBe('/en')
    })
  })

  describe('oppositeLocale', () => {
    it('switches between ar and en', () => {
      expect(oppositeLocale('en')).toBe('ar')
      expect(oppositeLocale('ar')).toBe('en')
    })
  })

  describe('formatCurrency', () => {
    it('formats AED correctly for English', () => {
      const formatted = formatCurrency('en', 100)
      expect(formatted).toContain('AED')
      expect(formatted).toContain('100')
    })
  })
})
