import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookingForm } from '@/components/site/booking-form'
import { vi, expect, it, describe, beforeEach } from 'vitest'

describe('BookingForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders correctly', () => {
    render(<BookingForm locale="en" vehicleId="v1" vehicleName="Car" dailyPrice={100} />)
    expect(screen.getByText('Book this vehicle')).toBeInTheDocument()
  })

  it('calculates total price based on dates', () => {
    render(<BookingForm locale="en" vehicleId="v1" vehicleName="Car" dailyPrice={100} />)
    
    const startInput = screen.getByLabelText('Pickup Date')
    const endInput = screen.getByLabelText('Return Date')
    
    fireEvent.change(startInput, { target: { value: '2026-05-01' } })
    fireEvent.change(endInput, { target: { value: '2026-05-03' } })
    
    expect(screen.getByText('Estimated Total')).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
  })

  it('submits booking successfully', async () => {
    fetchMock.mockResponse(JSON.stringify({ ok: true, bookingId: 'b123' }))
    
    render(<BookingForm locale="en" vehicleId="v1" vehicleName="Car" dailyPrice={100} />)
    
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Mobile Number'), { target: { value: '12345678' } })
    fireEvent.change(screen.getByLabelText('Pickup Date'), { target: { value: '2026-05-01' } })
    fireEvent.change(screen.getByLabelText('Return Date'), { target: { value: '2026-05-02' } })
    
    fireEvent.click(screen.getByText('Confirm Booking & Pay'))
    
    await waitFor(() => {
      expect(screen.getByText(/Booking request received/)).toBeInTheDocument()
    })
  })
})
