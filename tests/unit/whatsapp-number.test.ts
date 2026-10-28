/**
 * Unit tests for WhatsApp phone number normalization.
 *
 * Syrian phone format rules:
 * - Strip all non-digit characters
 * - Replace leading 0 with country code 963
 * - If starts with 9 and is 9 digits → prepend 963
 * - Must result in 12-digit number starting with 963
 */
import { describe, it, expect } from 'vitest'

/**
 * Normalize a Syrian phone number to international format.
 * This is the logic used internally in WhatsAppSupportFAB when building wa.me links.
 */
function normalizeSyrianPhone(input: string): string {
  // Strip non-digits
  let digits = input.replace(/\D/g, '')

  // Replace leading 0 with 963 (e.g. 0933112233 → 963933112233)
  if (digits.startsWith('0')) {
    digits = '963' + digits.slice(1)
  }

  // If it's a 9-digit local number starting with 9 (e.g. 933112233)
  if (digits.length === 9 && digits.startsWith('9')) {
    digits = '963' + digits
  }

  // If starts with +963, already stripped the +
  // Just return the digits
  return digits
}

describe('normalizeSyrianPhone', () => {
  it('handles full international format', () => {
    expect(normalizeSyrianPhone('+963933112233')).toBe('963933112233')
  })

  it('handles international without plus', () => {
    expect(normalizeSyrianPhone('963933112233')).toBe('963933112233')
  })

  it('replaces leading 0 with 963', () => {
    expect(normalizeSyrianPhone('0933112233')).toBe('963933112233')
  })

  it('handles 9-digit local number', () => {
    expect(normalizeSyrianPhone('933112233')).toBe('963933112233')
  })

  it('strips dashes and spaces', () => {
    expect(normalizeSyrianPhone('+963-933-112-233')).toBe('963933112233')
    expect(normalizeSyrianPhone('0933 112 233')).toBe('963933112233')
  })

  it('strips parentheses', () => {
    expect(normalizeSyrianPhone('(0933) 112233')).toBe('963933112233')
  })

  it('handles MTN numbers (094x)', () => {
    expect(normalizeSyrianPhone('0944556677')).toBe('963944556677')
    expect(normalizeSyrianPhone('944556677')).toBe('963944556677')
  })

  it('handles Syriatel numbers (093x)', () => {
    expect(normalizeSyrianPhone('0931234567')).toBe('963931234567')
  })

  it('handles landline numbers (011)', () => {
    // Damascus landline
    expect(normalizeSyrianPhone('0112345678')).toBe('963112345678')
  })

  it('produces 12-digit number for mobile inputs', () => {
    const result = normalizeSyrianPhone('+963933112233')
    expect(result).toHaveLength(12)
    expect(result).toMatch(/^963/)
  })
})
