import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, InputNumber } from 'antd';
import { z } from 'zod';

const schema = z.object({
  amount: z.number({ message: 'Per mažai' }).min(0.01, { message: 'Per mažai' }).max(100, { message: 'Per daug' }), // max saskaitos likutis
  payeeAccount: z.string({ message: 'Per mažai' }).min(1, { message: 'Davai blt' }), //iban tikrint per api https://matavi.eu/validate/?iban=LT307300010172619164
  purpose: z.string({ message: 'Per mažai' }).min(3, { message: 'Per mažai' }).max(135, { message: 'Per daug' }),
  payerAccount: z.string({ message: 'Per mažai' }).min(1, { message: 'Reikia ivest' }),
  payee: z.string({ message: 'Per mažai' }).min(1, { message: 'Per mažai' }).max(70, { message: 'Per daug' }),
});

type Inputs = z.infer<typeof schema>;

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

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

      <Controller
        name='payerAccount'
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder='payerAccount' onChange={value => field.onChange(value)} />
        )}
      />
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
}
