import { NumberInput } from '@mantine/core';
import type { INumber } from '../../../../typings/dialog';
import { type Control, useController } from 'react-hook-form';
import type { FormValues } from '../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: INumber;
  index: number;
  control: Control<FormValues>;
}

const NumberField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.row.default,
    rules: { required: props.row.required, min: props.row.min, max: props.row.max },
  });

  return (
    <NumberInput
      //@ts-expect-error
      leftSection={<LibIcon icon={props.row.icon}/>}
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.row.label}
      description={props.row.description}
      defaultValue={props.row.default}
      min={props.row.min}
      max={props.row.max}
      step={props.row.step}
      disabled={props.row.disabled}
      withAsterisk={props.row.required}
      decimalScale={props.row.precision}
    />
  );
};

export default NumberField;