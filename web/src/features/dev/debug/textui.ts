import type { TextUiProps } from '../../../typings/textui';
import { debugData } from '../../../utils/debugData';

export const debugTextUI = () => {
  debugData<TextUiProps[]>([
    {
      action: 'textUi',
      data: [
        {
          key: 'E',
          text: 'CANCEL',
        }
      ]
    },
  ]);
};