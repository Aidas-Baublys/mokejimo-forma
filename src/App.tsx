import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  example: z.string().min(1, { message: 'Davai tik' }),
  exampleRequired: z.string().min(1, { message: 'Nagi blt' }),
});

type Inputs = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  // console.log('watch', watch('example'));
  console.log('🚀 ~ App ~ errors:', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('example', { required: true })} />
      {errors.example?.message && <span>{errors.example?.message}</span>}
      <hr />
      <input {...register('exampleRequired', { required: true })} />
      {errors.exampleRequired?.message && <span>{errors.exampleRequired?.message}</span>}

      <input type='submit' />
    </form>
  );
}
