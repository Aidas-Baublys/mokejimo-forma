import { PaymentProvider } from './paymentForm/paymentFormState';
import PaymentForm from './paymentForm/paymentForm';
import LangSelect from './translations/langSelect';

export default function App() {
  return (
    <PaymentProvider>
      <LangSelect />
      <PaymentForm />
    </PaymentProvider>
  );
}
