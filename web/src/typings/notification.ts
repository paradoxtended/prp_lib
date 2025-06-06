export interface NotificationProps {
  description: string;
  title?: string;
  duration?: number;
  type?: 'error' | 'success' | 'inform';
}