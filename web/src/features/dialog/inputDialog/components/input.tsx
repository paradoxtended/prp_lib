import { PasswordInput, TextInput } from '@mantine/core';
import React from 'react';
import type { IInput } from '../../../../typings/dialog';
import type { UseFormRegisterReturn } from 'react-hook-form';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: IInput;
  index: number;
}

const InputField: React.FC<Props> = (props) => {
  return (
    <>
      {!props.row.password ? (
        <TextInput
          {...props.register}
          // @ts-expect-error
          leftSection={props.row.icon ? <LibIcon icon={props.row.icon} /> : undefined}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
        />
      ) : (
        <PasswordInput
          {...props.register}
          //@ts-expect-error
          leftSection={props.row.icon ? <LibIcon icon={props.row.icon} /> : undefined}
          defaultValue={props.row.default}
          label={props.row.label}
          description={props.row.description}
          placeholder={props.row.placeholder}
          minLength={props.row.min}
          maxLength={props.row.max}
          disabled={props.row.disabled}
          withAsterisk={props.row.required}
          visibilityToggleIcon={({ reveal }) => (
            <LibIcon
              icon={reveal ? 'eye-slash' : 'eye'}
              fontSize={15}
              cursor="pointer"
              fixedWidth
            />
          )}
        />
      )}
    </>
  );
};

export default InputField;