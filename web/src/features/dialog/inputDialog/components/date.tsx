import type { IDateInput } from '../../../../typings/dialog';
import { type Control, useController } from 'react-hook-form';
import type { FormValues } from '../InputDialog';
import { DatePickerInput } from '@mantine/dates';

interface Props {
  row: IDateInput;
  index: number;
  control: Control<FormValues>;
}

const DateField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required, min: props.row.min, max: props.row.max },
  });

  return (
    <>
      {props.row.type === 'date' && (
        <DatePickerInput
          value={controller.field.value ? new Date(controller.field.value) : controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          // Workaround to use timestamp instead of Date object in values
          onChange={(date: any) => controller.field.onChange(date ? date.getTime() : null)}
          label={props.row.label}
          description={props.row.description}
          placeholder={props.row.format}
          disabled={props.row.disabled}
          valueFormat={props.row.format}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          minDate={props.row.min ? new Date(props.row.min) : undefined}
          maxDate={props.row.max ? new Date(props.row.max) : undefined}
        />
      )}
    </>
  );
};

export default DateField;