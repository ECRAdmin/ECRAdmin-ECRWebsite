import { describe, it, expect, vi, beforeEach } from 'vitest'
import { storeInquiry, inquirySchema } from './lead-store'
import * as fs from 'node:fs/promises'

vi.mock('node:fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs/promises')>()
  return {
    ...actual,
    mkdir: vi.fn().mockResolvedValue(undefined),
    appendFile: vi.fn().mockResolvedValue(undefined),
  }
})

global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({}),
  ok: true,
})

describe('lead-store', () => {
  const validInquiry = {
    locale: 'en' as const,
    name: 'John Doe',
    mobile: '123456789',
    whatsapp: '123456789',
    residencyType: 'resident' as const,
    pickupCity: 'Dubai',
    rentalTerm: 'daily' as const,
    preferredCar: 'Economy Car',
    budgetBand: 'Low',
    preferredDate: '2026-05-01',
    consent: true as const,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates correct inquiry data', () => {
    const result = inquirySchema.safeParse(validInquiry)
    expect(result.success).toBe(true)
  })

  it('stores inquiry locally', async () => {
    await storeInquiry(validInquiry)
    expect(fs.mkdir).toHaveBeenCalled()
    expect(fs.appendFile).toHaveBeenCalled()
  })

  it('triggers webhook if URL is provided', async () => {
    process.env.LEAD_WEBHOOK_URL = 'http://webhook.test'
    await storeInquiry(validInquiry)
    expect(global.fetch).toHaveBeenCalledWith('http://webhook.test', expect.any(Object))
    delete process.env.LEAD_WEBHOOK_URL
  })
})
