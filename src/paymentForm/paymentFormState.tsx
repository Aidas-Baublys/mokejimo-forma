import { createContext, FC, useContext, useState } from 'react';

type Account = {
  iban: string;
  id: string;
  balance: number;
};

type PaymentContextType = {
  payerAccounts: Account[];
  selectedAccount: Account;
  setSelectedAccount: (account: Account) => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Dummy data, would get from endpoint and set in this context
const payerAccounts = [
  { iban: 'LT307300010172619160', id: '1', balance: 1000.12 },
  { iban: 'LT307300010172619161', id: '2', balance: 2.43 },
  { iban: 'LT307300010172619162', id: '3', balance: -5.87 },
];

export const PaymentProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account>(payerAccounts[0]);

  return (
    <PaymentContext.Provider value={{ payerAccounts, selectedAccount, setSelectedAccount }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};
