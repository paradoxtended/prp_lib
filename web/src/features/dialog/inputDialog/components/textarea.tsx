import { Textarea } from '@mantine/core';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ITextarea } from '../../../../typings/dialog';
import React from 'react';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  register: UseFormRegisterReturn;
  row: ITextarea;
  index: number;
}

const TextareaField: React.FC<Props> = (props) => {
  return (
    <Textarea
      {...props.register}
      // @ts-expect-error
      leftSection={props.row.icon ? <LibIcon icon={props.row.icon} /> : undefined}
      defaultValue={props.row.default}
      label={props.row.label}
      description={props.row.description}
      placeholder={props.row.placeholder}
      disabled={props.row.disabled}
      withAsterisk={props.row.required}
      autosize={props.row.autosize}
      minRows={props.row.min}
      maxRows={props.row.max}
    />
  );
};

export default TextareaField;