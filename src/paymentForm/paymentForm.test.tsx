import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../translations/translationState';
import { PaymentProvider } from './paymentFormState';
import PaymentForm from './paymentForm';

const renderComponent = () => {
  return render(
    <LanguageProvider>
      <PaymentProvider>
        <PaymentForm />
      </PaymentProvider>
    </LanguageProvider>,
  );
};

describe('PaymentForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the form and submits with valid data', async () => {
    renderComponent();

    const amount = screen.getByTestId('amount');
    await userEvent.type(amount, '1');

    const payeeAccountInput = screen.getByTestId(/payeeAccount/i);
    await userEvent.type(payeeAccountInput, 'LT307300010172619169');

    const purposeInput = screen.getByPlaceholderText(/purpose/i);
    await userEvent.type(purposeInput, 'Payment for services');

    const payee = screen.getByTestId('payee');
    await userEvent.type(payee, 'John Doe');

    const payerAccountDropdown = screen.getByText(/LT307300010172619160/i);
    await userEvent.click(payerAccountDropdown);

    const firstOption = screen.getByText('LT307300010172619161');
    await userEvent.click(firstOption);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(screen.queryAllByText(/This field is required/i)).toHaveLength(0);
  });

  it('shows validation errors for invalid data', async () => {
    renderComponent();

    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);

    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(4);
  });
});
