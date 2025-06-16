import { Checkbox } from '@mantine/core';
import type { ICheckbox } from '../../../../typings/dialog';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  row: ICheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const CheckboxField: React.FC<Props> = (props) => {
  return (
    <Checkbox
      {...props.register}
      size="sm"
      required={props.row.required}
      label={props.row.label}
      defaultChecked={props.row.checked}
      disabled={props.row.disabled}
    />
  );
};

export default CheckboxField;