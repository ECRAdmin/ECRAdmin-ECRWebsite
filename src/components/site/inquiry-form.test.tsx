import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InquiryForm } from '@/components/site/inquiry-form'
import { vi, expect, it, describe, beforeEach } from 'vitest'

describe('InquiryForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders correctly in English', () => {
    render(<InquiryForm locale="en" />)
    expect(screen.getByText('Start your inquiry')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('submits the form successfully', async () => {
    fetchMock.mockResponse(JSON.stringify({ ok: true, whatsappUrl: 'https://wa.me/123' }))
    
    render(<InquiryForm locale="en" />)
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Mobile'), { target: { value: '12345678' } })
    fireEvent.change(screen.getByLabelText('WhatsApp number'), { target: { value: '12345678' } })
    fireEvent.change(screen.getByLabelText('Pickup city'), { target: { value: 'Dubai' } })
    fireEvent.change(screen.getByLabelText('Budget band'), { target: { value: '100' } })
    fireEvent.click(screen.getByLabelText('I agree to share my details for inquiry processing.'))
    
    const submitButton = screen.getByText('Send inquiry')
    
    // In React 19, we might need to use a real form submission or mock the action
    fireEvent.submit(screen.getByRole('form', { name: 'Inquiry Form' }))
    
    await waitFor(() => {
      expect(screen.getByText(/Inquiry sent successfully/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByText('Continue on WhatsApp')).toHaveAttribute('href', 'https://wa.me/123')
  })
})
