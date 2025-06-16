import { debugData } from '../../../utils/debugData';
import type { AlertProps } from '../../../typings/alert';

export const debugAlert = () => {
  debugData<AlertProps>([
    {
      action: 'sendAlert',
      data: {
        header: 'Sell Goods',
        content: 'Are you sure you want to sell all the goods?  \n The total cost is $727.  \n BTW. For you knowledge  \n My name is mr.ravage, and I am lead developer at Paradox.',
        cancel: true,
        // labels: {
        //   confirm: 'Ok',
        //   cancel: 'Not ok',
        // },
      },
    },
  ]);
};