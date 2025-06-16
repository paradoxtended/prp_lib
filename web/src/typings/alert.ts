export interface AlertProps {
  header: string;
  content: string;
  cancel?: boolean;
  typing?: boolean;
  labels?: {
    cancel?: string;
    confirm?: string;
  };
}