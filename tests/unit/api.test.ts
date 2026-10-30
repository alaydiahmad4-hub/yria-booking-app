/**
 * Unit tests for the API service layer (src/services/api.ts)
 *
 * Tests: network fallback (returns null), successful fetch, and error status codes.
 * Uses vi.fn() to mock the global `fetch`.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// We need to import the api after mocking fetch, so use dynamic import
let api: typeof import('../../src/services/api')['api']

// Mock the global fetch
const mockFetch = vi.fn()

beforeEach(async () => {
  vi.stubGlobal('fetch', mockFetch)
  // Dynamic import to re-evaluate getBaseUrl() with jsdom window
  const mod = await import('../../src/services/api')
  api = mod.api
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('api.getChatMessages', () => {
  it('returns parsed JSON on successful response', async () => {
    const mockMessages = [
      { id: 'msg-1', sender: 'support', text: 'مرحباً', timestamp: new Date().toISOString() }
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMessages)
    })

    const result = await api.getChatMessages()
    expect(result).toEqual(mockMessages)
    expect(mockFetch).toHaveBeenCalledOnce()
    // Verify the URL contains the chat endpoint
    const calledUrl = mockFetch.mock.calls[0][0] as string
    expect(calledUrl).toContain('/chat/messages')
  })

  it('returns null on network error (fallback)', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const result = await api.getChatMessages()
    expect(result).toBeNull()
  })

  it('returns null on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' })
    })
    const result = await api.getChatMessages()
    expect(result).toBeNull()
  })
})

describe('api.sendChatMessage', () => {
  it('sends POST request with correct payload', async () => {
    const mockResponse = {
      replyMessage: {
        id: 'msg-reply',
        sender: 'support',
        text: 'تم استلام رسالتك',
        timestamp: new Date().toISOString()
      }
    }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const payload = {
      text: 'هل يتوفر شاليه في يعفور؟',
      sender: 'user',
      senderName: 'الضيف',
      propertyId: null,
      propertyTitle: null
    }

    const result = await api.sendChatMessage(payload)
    expect(result).toEqual(mockResponse)

    // Verify the request was a POST with JSON body
    const fetchCall = mockFetch.mock.calls[0]
    expect(fetchCall[1].method).toBe('POST')
    expect(fetchCall[1].headers['Content-Type']).toBe('application/json')
    const sentBody = JSON.parse(fetchCall[1].body)
    expect(sentBody.text).toBe('هل يتوفر شاليه في يعفور؟')
    expect(sentBody.sender).toBe('user')
  })

  it('returns null when server is offline', async () => {
    mockFetch.mockRejectedValueOnce(new Error('fetch failed'))
    const result = await api.sendChatMessage({ text: 'مرحبا' })
    expect(result).toBeNull()
  })
})

describe('api.getProperties', () => {
  it('passes includeAll query param', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    })

    await api.getProperties(true)
    const calledUrl = mockFetch.mock.calls[0][0] as string
    expect(calledUrl).toContain('all=true')
  })

  it('returns null on error (graceful fallback)', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const result = await api.getProperties()
    expect(result).toBeNull()
  })
})

describe('api.createBooking', () => {
  it('sends booking data via POST', async () => {
    const booking = {
      propertyId: 'prop-1',
      bookingType: 'overnight' as const,
      checkIn: '2026-11-01',
      checkOut: '2026-11-03',
      guestsCount: 4,
      guestName: 'أحمد',
      guestPhone: '+963933112233',
      paymentMethod: 'syriatel_cash' as const,
      totalPriceUsd: 200,
      totalPriceSyp: 2900000
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...booking, id: 'bk-1' })
    })

    const result = await api.createBooking(booking)
    expect(result).toBeTruthy()
    expect(result.success).toBe(true)
    expect(result.data?.id).toBe('bk-1')
  })
})

describe('api.exchangeRate', () => {
  it('fetches exchange rate correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ rate: 14800 })
    })

    const rate = await api.getExchangeRate()
    expect(rate).toBe(14800)
  })

  it('updates exchange rate correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, rate: 15000 })
    })

    const result = await api.updateExchangeRate(15000)
    expect(result.success).toBe(true)
  })
})

describe('api.resetChatMessages', () => {
  it('sends DELETE request', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    const result = await api.resetChatMessages()
    expect(result).toEqual({ success: true })

    const fetchCall = mockFetch.mock.calls[0]
    expect(fetchCall[1].method).toBe('DELETE')
  })
})
