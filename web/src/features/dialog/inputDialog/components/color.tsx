import type { IColorInput } from '../../../../typings/dialog';
import { type Control, useController } from 'react-hook-form';
import type { FormValues } from '../InputDialog';
import { ColorInput } from '@mantine/core';

interface Props {
  row: IColorInput;
  index: number;
  control: Control<FormValues>;
}

const ColorField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default,
    rules: { required: props.row.required },
  });

  return (
    <ColorInput
      withEyeDropper={false}
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.row.label}
      description={props.row.description}
      disabled={props.row.disabled}
      defaultValue={props.row.default}
      format={props.row.format}
      withAsterisk={props.row.required}
    />
  );
};

export default ColorField;