import { z } from 'zod';
import { InputConfig } from '../types';

const requiredMessage = 'Privalomas laukas';

export const CONSTANTS = {
  amount: 'amount',
  payeeAccount: 'payeeAccount',
  purpose: 'purpose',
  payerAccount: 'payerAccount',
  payee: 'payee',
} as const;

export const createSchema = (maxAmount: number, isPayeeAccountValid: boolean) => {
  return z.object({
    [CONSTANTS.amount]: z
      .number({ message: requiredMessage })
      .min(0.01, { message: 'Suma turi būti bent 0.01' })
      .max(maxAmount, { message: `Suma negali viršyti ${maxAmount}` }), // Dynamic max value
    [CONSTANTS.payeeAccount]: z
      .string({ message: requiredMessage })
      .min(1, { message: 'Gavėjo sąskaita turi būti bent 1 simbolis' })
      .refine(() => isPayeeAccountValid, { message: 'Gavėjo sąskaita yra neteisinga' }),
    [CONSTANTS.purpose]: z
      .string({ message: requiredMessage })
      .min(3, { message: 'Paskirtis turi būti bent 3 simboliai' })
      .max(135, { message: 'Paskirtis negali viršyti 135 simbolių' }),
    [CONSTANTS.payerAccount]: z
      .string({ message: requiredMessage })
      .min(1, { message: 'Mokėtojo sąskaita turi būti bent 1 simbolis' }),
    [CONSTANTS.payee]: z
      .string({ message: requiredMessage })
      .min(1, { message: 'Gavėjo vardas turi būti bent 1 simbolis' })
      .max(70, { message: 'Gavėjo vardas negali viršyti 70 simbolių' }),
  });
};

const schemaType = createSchema(1000, true);

export type PaymentFormInputs = z.infer<typeof schemaType>;

export const paymentFormConfig: InputConfig[] = [
  {
    key: 1,
    type: 'number',
    name: CONSTANTS.amount,
    label: CONSTANTS.amount,
    placeholder: CONSTANTS.amount,
  },
  {
    key: 2,
    type: 'string',
    name: CONSTANTS.payeeAccount,
    label: CONSTANTS.payeeAccount,
    placeholder: CONSTANTS.payeeAccount,
  },
  {
    key: 3,
    type: 'text',
    name: CONSTANTS.purpose,
    label: CONSTANTS.purpose,
    placeholder: CONSTANTS.purpose,
  },
  {
    key: 4,
    type: 'dropdown',
    name: CONSTANTS.payerAccount,
    label: CONSTANTS.payerAccount,
    placeholder: CONSTANTS.payerAccount,
  },
  {
    key: 5,
    type: 'string',
    name: CONSTANTS.payee,
    label: CONSTANTS.payee,
    placeholder: CONSTANTS.payee,
  },
];
