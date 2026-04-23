import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { storeInquiry } from '@/lib/lead-store'
import { isRateLimited } from '@/lib/rate-limit'

vi.mock('@/lib/lead-store', () => ({
  inquirySchema: {
    safeParse: vi.fn((data) => ({ success: true, data })),
  },
  storeInquiry: vi.fn((data) => Promise.resolve(data)),
}))

vi.mock('@/lib/rate-limit', () => ({
  isRateLimited: vi.fn(() => Promise.resolve(false)),
}))

describe('Inquiry API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 200 and stored data on success', async () => {
    const payload = {
      locale: 'en',
      name: 'John Doe',
      mobile: '123456789',
      whatsapp: '123456789',
      residencyType: 'resident',
      pickupCity: 'Dubai',
      rentalTerm: 'daily',
      preferredCar: 'Economy',
      budgetBand: 'Low',
      preferredDate: '2026-05-01',
      consent: true,
    }

    const req = new Request('http://localhost/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.ok).toBe(true)
    expect(storeInquiry).toHaveBeenCalled()
  })

  it('returns 429 when rate limited', async () => {
    vi.mocked(isRateLimited).mockResolvedValueOnce(true)

    const req = new Request('http://localhost/api/inquiries', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const res = await POST(req)
    expect(res.status).toBe(429)
    const data = await res.json()
    expect(data.error).toMatch(/Too many requests/)
  })
})
