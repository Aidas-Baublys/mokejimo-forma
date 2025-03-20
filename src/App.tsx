import { PaymentProvider } from './paymentForm/paymentFormState';
import PaymentForm from './paymentForm/paymentForm';

export default function App() {
  return (
    <PaymentProvider>
      <PaymentForm />
    </PaymentProvider>
  );
}
