import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select } from 'antd';
import { usePaymentContext } from './paymentFormState';
import { CONSTANTS, createSchema, paymentFormConfig, PaymentFormInputs } from './paymentFormConfig';
import RenderInputs from '../renderInputs/renderInputs';
import { useLanguage } from '../translationState';
import { formatBalance, validatePayeeAccount } from './helpers';

import styles from './paymentForm.module.css';

const { Option } = Select;

const PaymentForm: FC = () => {
  const [accountValid, setAccountValid] = useState<boolean>(false);
  const { translate: t, language } = useLanguage();
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {paymentFormConfig.map(config => (
        <RenderInputs key={config.key} config={config} errors={errors} control={control} />
      ))}

      {/* It makes more sense for this field to be a dropdown */}
      <label htmlFor={CONSTANTS.payerAccount}>{t(CONSTANTS.payerAccount)}</label>
      <Controller
        name={CONSTANTS.payerAccount}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={t(CONSTANTS.payerAccount)}
            className={styles.dropdown}
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
                {account.iban} {t('balance')}: {formatBalance(account.balance, language)}
              </Option>
            ))}
          </Select>
        )}
      />
      {errors.payerAccount && <p>{t(errors.payerAccount.message as string)}</p>}

      <hr className={styles.line} />

      <Button type='primary' htmlType='submit'>
        {t('submit')}
      </Button>
    </form>
  );
};

export default PaymentForm;
