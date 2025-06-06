import { debugData } from '../../../utils/debugData';
import type { ProgressbarProps } from '../../../typings/progress';

export const debugProgressbar = () => {
  debugData<ProgressbarProps>([
    {
      action: 'progress',
      data: {
        label: 'Using Lockpick',
        duration: 8000,
      },
    },
  ]);
};

export const debugCircleProgressbar = () => {
  debugData<ProgressbarProps>([
    {
      action: 'circleProgress',
      data: {
        duration: 8000,
        label: 'Using Armour',
      },
    },
  ]);
};