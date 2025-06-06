import { MultiSelect, Select } from '@mantine/core';
import type { ISelect } from '../../../../typings/dialog';
import { type Control, useController } from 'react-hook-form';
import type { FormValues } from '../InputDialog';
import LibIcon from '../../../../components/LibIcon';

interface Props {
  row: ISelect;
  index: number;
  control: Control<FormValues>;
}

const SelectField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.row.required },
  });

  return (
    <>
      {props.row.type === 'select' ? (
        <Select
          // @ts-expect-error
          leftSection={props.row.icon ? <LibIcon icon={props.row.icon} /> : undefined}
          data={props.row.options}
          value={controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={controller.field.onChange}
          disabled={props.row.disabled}
          label={props.row.label}
          description={props.row.description}
          withAsterisk={props.row.required}
          clearable={props.row.clearable}
          searchable={props.row.searchable}
        />
      ) : (
        <>
          {props.row.type === 'multi-select' && (
            <MultiSelect
              // @ts-expect-error
              leftSection={props.row.icon ? <LibIcon icon={props.row.icon} /> : undefined}
              data={props.row.options}
              value={controller.field.value}
              name={controller.field.name}
              ref={controller.field.ref}
              onBlur={controller.field.onBlur}
              onChange={controller.field.onChange}
              disabled={props.row.disabled}
              label={props.row.label}
              description={props.row.description}
              withAsterisk={props.row.required}
              clearable={props.row.clearable}
              searchable={props.row.searchable}
              maxValues={props.row.maxSelectedValues}
            />
          )}
        </>
      )}
    </>
  );
};

export default SelectField;