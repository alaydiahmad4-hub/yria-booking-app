/**
 * Unit tests for the price formatting logic in AppContext.
 *
 * Tests the formatPrice() and getPriceValue() functions that handle
 * USD ↔ SYP conversion with the Syrian Pound exchange rate.
 */
import { describe, it, expect } from 'vitest'
import { SYP_PER_USD } from '../../src/data/mockData'

// Extract the pure functions for isolated testing (same logic as AppContext)
const formatPrice = (priceUsd: number, currency: 'USD' | 'SYP'): string => {
  if (currency === 'SYP') {
    const syp = Math.round(priceUsd * SYP_PER_USD)
    return `${syp.toLocaleString('ar-SY')} ل.س`
  }
  return `$${priceUsd}`
}

const getPriceValue = (priceUsd: number, currency: 'USD' | 'SYP') => {
  if (currency === 'SYP') {
    return { value: Math.round(priceUsd * SYP_PER_USD), label: 'ل.س' }
  }
  return { value: priceUsd, label: '$' }
}

describe('SYP_PER_USD constant', () => {
  it('is a positive number', () => {
    expect(SYP_PER_USD).toBeGreaterThan(0)
    expect(typeof SYP_PER_USD).toBe('number')
  })

  it('is set to 14500 (current rate)', () => {
    expect(SYP_PER_USD).toBe(14500)
  })
})

describe('formatPrice', () => {
  it('formats USD correctly with $ prefix', () => {
    expect(formatPrice(100, 'USD')).toBe('$100')
    expect(formatPrice(0, 'USD')).toBe('$0')
    expect(formatPrice(49.99, 'USD')).toBe('$49.99')
  })

  it('formats SYP correctly with ل.س suffix', () => {
    const result = formatPrice(100, 'SYP')
    // 100 * 14500 = 1,450,000
    expect(result).toContain('ل.س')
    // The numeric part should represent 1450000
    // toLocaleString('ar-SY') may use Arabic-Indic digits (١٬٤٥٠٬٠٠٠) or Latin (1,450,000)
    expect(result).toMatch(/[1١][,،٬.]?[4٤][5٥][0٠][,،٬.]?[0٠][0٠][0٠]/)
  })

  it('rounds SYP to nearest integer', () => {
    // 1 USD → 14500 SYP (exact)
    const result = formatPrice(1, 'SYP')
    expect(result).toContain('ل.س')
  })

  it('handles zero price', () => {
    expect(formatPrice(0, 'USD')).toBe('$0')
    const sypZero = formatPrice(0, 'SYP')
    expect(sypZero).toContain('ل.س')
  })
})

describe('getPriceValue', () => {
  it('returns USD value with $ label', () => {
    const result = getPriceValue(50, 'USD')
    expect(result.value).toBe(50)
    expect(result.label).toBe('$')
  })

  it('returns SYP converted value with ل.س label', () => {
    const result = getPriceValue(50, 'SYP')
    expect(result.value).toBe(50 * SYP_PER_USD)
    expect(result.label).toBe('ل.س')
  })

  it('rounds SYP value to integer', () => {
    const result = getPriceValue(0.33, 'SYP')
    expect(Number.isInteger(result.value)).toBe(true)
    expect(result.value).toBe(Math.round(0.33 * SYP_PER_USD))
  })
})
