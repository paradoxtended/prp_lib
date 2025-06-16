import type { NotificationProps } from '../../../typings/notification';
import { debugData } from '../../../utils/debugData';

export const debugCustomNotification = () => {
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        description: 'Hello there, it\'s Ravage',
        type: 'success',
        duration: 5000
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        description: 'Notification description',
        type: 'error',
        duration: 7500
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        description: 'Notification description',
        type: 'inform',
        duration: 3000
      },
    },
  ]);
};