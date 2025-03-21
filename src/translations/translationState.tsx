import { createContext, useContext, useState, ReactNode, FC } from 'react';

type Language = 'en' | 'lt';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Can extended to take vars in trans strings 'Submit {name}'
const translationsMap = (lang: Language, key: string): string => {
  // For bigger app, these can be separate files
  const translations: Record<Language, Record<string, string>> = {
    en: {
      amount: 'Amount',
      payee: 'Payee',
      payerAccount: 'Payer Account',
      payeeAccount: 'Payee Account',
      purpose: 'Purpose',
      submit: 'Submit',
      en: 'EN',
      lt: 'LT',
      balance: 'Balance',
      requiredErrMsg: 'This field is required',
      errMsg1: 'Amount must be at least 0.01',
      errMsg2: 'Amount cannot exceed the balance',
      errMsg3: 'Payee account must be at least 1 character',
      errMsg4: 'Payee account is invalid',
      errMsg5: 'Purpose must be at least 3 characters',
      errMsg6: 'Purpose cannot exceed 135 characters',
      errMsg7: 'Payer account must be at least 1 character',
      errMsg8: 'Payee name must be at least 1 character',
      errMsg9: 'Payee name cannot exceed 70 characters',
    },
    lt: {
      amount: 'Suma',
      payee: 'Gavėjas',
      payerAccount: 'Mokėtojo sąskaita',
      payeeAccount: 'Gavėjo sąskaita',
      purpose: 'Paskirtis',
      submit: 'Pateikti',
      en: 'EN',
      lt: 'LT',
      balance: 'Likutis',
      requiredErrMsg: 'Privalomas laukas',
      errMsg1: 'Suma turi būti bent 0.01',
      errMsg2: 'Suma negali viršyti likučio',
      errMsg3: 'Gavėjo sąskaita turi būti bent 1 simbolis',
      errMsg4: 'Gavėjo sąskaita yra neteisinga',
      errMsg5: 'Paskirtis turi būti bent 3 simboliai',
      errMsg6: 'Paskirtis negali viršyti 135 simbolių',
      errMsg7: 'Mokėtojo sąskaita turi būti bent 1 simbolis',
      errMsg8: 'Gavėjo vardas turi būti bent 1 simbolis',
      errMsg9: 'Gavėjo vardas negali viršyti 70 simbolių',
    },
  };

  return translations[lang][key] || key;
};

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translate: (key: string) => translationsMap(language, key),
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
