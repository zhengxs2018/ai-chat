import classNames from 'classnames';

const styles = {
  warning: 'bg-yellow-100 text-yellow-700',
};

export type AlertProps = {
  text: string;
  type?: 'success' | 'error' | 'warning' | 'info';
};

export default function Alert({ type, text }: AlertProps) {
  return (
    <div className={classNames('mb-2 p-2 text-xs', styles[type])}>{text}</div>
  );
}
