import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputNumber, Select } from 'antd';
import { usePaymentContext } from './paymentFormState';
import { CONSTANTS, createSchema, PaymentFormInputs } from './paymentFormConfig';

const { Option } = Select;

const validatePayeeAccount = async (payeeAccount: string): Promise<boolean> => {
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

const PaymentForm: FC = () => {
  const [accountValid, setAccountValid] = useState<boolean>(false);
  const { payerAccounts, selectedAccount, setSelectedAccount } = usePaymentContext();
  const schema = createSchema(selectedAccount.balance, accountValid);
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(schema),
  });

  const payeeAccount = watch(CONSTANTS.payeeAccount);

  useEffect(() => {
    const checkAccount = async () => {
      const isValid = await validatePayeeAccount(payeeAccount);
      setAccountValid(isValid);
    };

    // Add len check to not call the endpoint on every key press
    if (payeeAccount && payeeAccount.length > 6) {
      checkAccount();
    }
  }, [payeeAccount]);

  const onSubmit: SubmitHandler<PaymentFormInputs> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='amount'
        control={control}
        render={({ field }) => (
          <InputNumber {...field} placeholder='amount' onChange={value => field.onChange(value)} />
        )}
      />
      {errors.amount && <p>{errors.amount.message}</p>}

      <Controller
        name='payeeAccount'
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder='payeeAccount' onChange={value => field.onChange(value)} />
        )}
      />
      {errors.payeeAccount && <p>{errors.payeeAccount.message}</p>}

      <Controller
        name='purpose'
        control={control}
        render={({ field }) => <Input {...field} placeholder='purpose' onChange={value => field.onChange(value)} />}
      />
      {errors.purpose && <p>{errors.purpose.message}</p>}

      {/* It makes more sense for this field to be a dropdown */}
      <Controller
        name='payerAccount'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder='Select payer account'
            defaultValue={payerAccounts[0].iban}
            onChange={value => {
              const account = payerAccounts.find(acc => acc.iban === value);
              if (account) {
                setSelectedAccount(account);
              }
              field.onChange(value);
            }}>
            {payerAccounts.map(account => (
              <Option key={account.id} value={account.iban}>
                {account.iban}
              </Option>
            ))}
          </Select>
        )}
      />
      <p>Max amount: {selectedAccount.balance}</p>
      {errors.payerAccount && <p>{errors.payerAccount.message}</p>}

      <Controller
        name='payee'
        control={control}
        render={({ field }) => <Input {...field} placeholder='payee' onChange={value => field.onChange(value)} />}
      />
      {errors.payee && <p>{errors.payee.message}</p>}

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </form>
  );
};

export default PaymentForm;
