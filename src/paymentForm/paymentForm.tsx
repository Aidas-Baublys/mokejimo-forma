import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select } from 'antd';
import { usePaymentContext } from './paymentFormState';
import { CONSTANTS, createSchema, paymentFormConfig, PaymentFormInputs } from './paymentFormConfig';
import RenderInputs from '../renderInputs';

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
    defaultValues: {
      [CONSTANTS.payerAccount]: payerAccounts[0].iban,
    },
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
      {paymentFormConfig.map(config => (
        <RenderInputs key={config.key} config={config} errors={errors} control={control} />
      ))}

      {/* It makes more sense for this field to be a dropdown */}
      <label htmlFor={CONSTANTS.payerAccount}>{CONSTANTS.payerAccount}</label>
      <Controller
        name={CONSTANTS.payerAccount}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={CONSTANTS.payerAccount}
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

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </form>
  );
};

export default PaymentForm;
