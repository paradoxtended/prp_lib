import { TimeInput } from '@mantine/dates';
import { type Control, useController } from 'react-hook-form';
import type { ITimeInput } from '../../../../typings/dialog';
import type { FormValues } from '../InputDialog';

interface Props {
  row: ITimeInput;
  index: number;
  control: Control<FormValues>;
}

const TimeField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });

  return (
    <TimeInput
      value={controller.field.value ? new Date(controller.field.value) : controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={(date: any) => controller.field.onChange(date ? date.getTime() : null)}
      label={props.row.label}
      description={props.row.description}
      disabled={props.row.disabled}
      withAsterisk={props.row.required}
    />
  );
};

export default TimeField;