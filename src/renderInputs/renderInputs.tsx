import { FC, Fragment } from 'react';
import { InputConfig } from '../types';
import { Controller, FieldErrors } from 'react-hook-form';
import { Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import cx from 'classnames';

import styles from './renderInputs.module.css';

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
        <div className={styles.container} key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder={placeholder}
                className={cx(styles.inputNumber, styles.inputs, {
                  [styles.inputsError]: errors[name],
                })}
                onChange={value => field.onChange(value)}
              />
            )}
          />
          {errors[name] && <p className={cx(styles.error)}>{errors[name].message as string}</p>}
        </div>
      );
    case 'string':
      return (
        <div className={styles.container} key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={placeholder}
                className={cx(styles.inputs, {
                  [styles.inputsError]: errors[name],
                })}
                onChange={value => field.onChange(value)}
              />
            )}
          />
          {errors[name] && <p className={cx(styles.error)}>{errors[name].message as string}</p>}
        </div>
      );
    case 'text':
      return (
        <div className={styles.container} key={key}>
          <label htmlFor={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder={placeholder}
                className={cx(styles.inputs, {
                  [styles.inputsError]: errors[name],
                })}
                rows={4}
                onChange={e => field.onChange(e.target.value)}
              />
            )}
          />
          {errors[name] && <p className={cx(styles.error)}>{errors[name].message as string}</p>}
        </div>
      );
  }
};

export default RenderInputs;
