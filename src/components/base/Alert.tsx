import clsx from 'clsx';

const styles = {
  warning: 'bg-yellow-100 text-yellow-700',
};

export type AlertProps = {
  className?: string;
  text: string;
  type?: 'success' | 'error' | 'warning' | 'info';
};

export default function Alert({ className, type, text }: AlertProps) {
  return (
    <div className={clsx('p-2 text-xs', styles[type], className)}>
      {text}
    </div>
  );
}
