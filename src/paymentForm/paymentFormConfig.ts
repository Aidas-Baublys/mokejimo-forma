import { z } from 'zod';
import { InputConfig } from '../types';

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
      .number({ message: 'requiredErrMsg' })
      .min(0.01, { message: 'errMsg1' })
      .max(maxAmount, { message: 'errMsg2' }),
    [CONSTANTS.payeeAccount]: z
      .string({ message: 'requiredErrMsg' })
      .min(1, { message: 'errMsg3' })
      .refine(() => isPayeeAccountValid, { message: 'errMsg4' }),
    [CONSTANTS.purpose]: z
      .string({ message: 'requiredErrMsg' })
      .min(3, { message: 'errMsg5' })
      .max(135, { message: 'errMsg6' }),
    [CONSTANTS.payerAccount]: z.string({ message: 'requiredErrMsg' }).min(1, { message: 'errMsg7' }),
    [CONSTANTS.payee]: z
      .string({ message: 'requiredErrMsg' })
      .min(1, { message: 'errMsg8' })
      .max(70, { message: 'errMsg9' }),
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
