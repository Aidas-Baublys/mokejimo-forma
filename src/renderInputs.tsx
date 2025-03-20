import { FC, Fragment } from 'react';
import { InputConfig } from './types';
import { Controller, FieldErrors } from 'react-hook-form';
import { Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type RenderInputsProps = {
  config: InputConfig;
  errors: FieldErrors;
  control: any;
};

const RenderInputs: FC<RenderInputsProps> = ({ config, errors, control }) => {
  const { key, type, name, label, placeholder } = config;

  switch (type) {
    case 'number':
      return (
        <Fragment key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <InputNumber {...field} placeholder={placeholder} onChange={value => field.onChange(value)} />
            )}
          />
          {errors[name] && <p>{errors[name].message as string}</p>}
        </Fragment>
      );
    case 'string':
      return (
        <Fragment key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={placeholder} onChange={value => field.onChange(value)} />
            )}
          />
          {errors[name] && <p>{errors[name].message as string}</p>}
        </Fragment>
      );
    case 'text':
      return (
        <Fragment key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextArea {...field} placeholder={placeholder} rows={4} onChange={e => field.onChange(e.target.value)} />
            )}
          />
          {errors[name] && <p>{errors[name].message as string}</p>}
        </Fragment>
      );
  }
};

export default RenderInputs;
