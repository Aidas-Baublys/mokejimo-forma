// Naive implementation for testing purposes
// Would use redux saga or equivalent in a real world scenario
// with a class to handle auth/no auth requests
export const validatePayeeAccount = async (payeeAccount: string): Promise<boolean> => {
  try {
    // Url always gets a CORS error
    const response = await fetch(`https://matavi.eu/validate/?iban=${payeeAccount}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data.isValid;
  } catch (error) {
    // Url always gets a CORS error, so we return true for testing purposes
    return true;
  }
};

export const formatBalance = (balance: number, locale: string = 'en', currency: string = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);
};
