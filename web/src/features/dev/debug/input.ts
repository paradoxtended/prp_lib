import { debugData } from '../../../utils/debugData';
import type { InputProps } from '../../../typings/dialog';

export const debugInput = () => {
  debugData<InputProps>([
    {
      action: 'openDialog',
      data: {
        heading: 'Police locker',
        rows: [
          {
            type: 'input',
            label: 'Locker number',
            placeholder: '420',
            description: 'Description that tells you what this input field does',
            icon: 'envelope'
          },
          {
            type: 'time',
            format: '12',
            label: 'Locker Time',
            description: 'Description that tells you what this input field does',
            icon: 'envelope'
          },
          { type: 'checkbox', label: 'Some checkbox' },
          { type: 'input', label: 'Locker PIN', placeholder: '5762', password: true, icon: 'lock' },
          { type: 'checkbox', label: 'Some other checkbox', checked: true },
          {
            type: 'select',
            label: 'Locker type',
            options: [
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
            icon: 'envelope'
          },
          {
            type: 'number',
            label: 'Number counter',
            default: 12,
            min: 3,
            max: 10,
            icon: 'receipt',
          },
          {
            type: 'number',
            label: 'Price',
            default: 6.5,
            min: 0,
            max: 10,
            icon: 'receipt',
          },
          {
            type: 'slider',
            label: 'Slide bar',
            min: 10,
            max: 50,
            step: 2,
          },
        ]
      },
    },
  ]);
};