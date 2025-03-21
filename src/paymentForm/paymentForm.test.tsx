import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { LanguageProvider } from '../translations/translationState';
import { PaymentProvider } from './paymentFormState';
import PaymentForm from './paymentForm';

describe('PaymentForm', () => {
  it('renders the form and submits with valid data', async () => {
    const mockSubmit = vi.fn(); // Mock the submit handler

    render(
      <LanguageProvider>
        <PaymentProvider>
          <PaymentForm />
        </PaymentProvider>
      </LanguageProvider>,
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/payer account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/payer account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    // Simulate selecting a payer account
    const payerAccountDropdown = screen.getByPlaceholderText(/payer account/i);
    userEvent.click(payerAccountDropdown);
    const firstOption = await screen.findByText(/LT307300010172619160/i);
    userEvent.click(firstOption);

    // Simulate entering a payee account
    const payeeAccountInput = screen.getByPlaceholderText(/payee account/i);
    userEvent.type(payeeAccountInput, 'LT307300010172619161');

    // Simulate entering a purpose
    const purposeInput = screen.getByPlaceholderText(/purpose/i);
    userEvent.type(purposeInput, 'Payment for services');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // Wait for the form submission
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it('shows validation errors for invalid data', async () => {
    render(
      <LanguageProvider>
        <PaymentProvider>
          <PaymentForm />
        </PaymentProvider>
      </LanguageProvider>,
    );

    // Submit the form without entering any data
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // Check for validation errors
    expect(await screen.findByText(/payer account is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/payee account is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/purpose is required/i)).toBeInTheDocument();
  });
});
