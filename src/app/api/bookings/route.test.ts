import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { writeClient } from '@/lib/sanity/client'

vi.mock('@/lib/sanity/client', () => ({
  writeClient: {
    fetch: vi.fn(),
    create: vi.fn(),
  },
}))

describe('Booking API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    
    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 400 if vehicle is not available', async () => {
    vi.mocked(writeClient!.fetch).mockResolvedValueOnce({ isAvailable: false, stock: 0 })
    
    const req = new Request('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '12345678',
        vehicleId: 'v123',
        startDate: '2026-05-01',
        endDate: '2026-05-05',
      }),
    })
    
    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBe('Vehicle is not available for booking.')
  })

  it('creates a booking successfully', async () => {
    vi.mocked(writeClient!.fetch).mockResolvedValueOnce({ _id: 'v123', isAvailable: true, stock: 5 })
    vi.mocked(writeClient!.create).mockResolvedValueOnce({ _id: 'b123' })
    
    const req = new Request('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '12345678',
        vehicleId: 'v123',
        startDate: '2026-05-01',
        endDate: '2026-05-05',
        totalAmount: 500,
      }),
    })
    
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.ok).toBe(true)
    expect(data.bookingId).toBe('b123')
    
    expect(writeClient!.create).toHaveBeenCalledWith(expect.objectContaining({
      _type: 'booking',
      customerName: 'John Doe',
      status: 'pending',
    }))
  })
})
