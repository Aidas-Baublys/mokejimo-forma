import { PaymentProvider } from './paymentForm/paymentFormState';
import PaymentForm from './paymentForm/paymentForm';
import LangSelect from './langSelect';

export default function App() {
  return (
    <PaymentProvider>
      <LangSelect />
      <PaymentForm />
    </PaymentProvider>
  );
}
