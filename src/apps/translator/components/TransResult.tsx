import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

export type TransResultProps = {
  className?: string;
  text?: string;
};

export default function TransResult({ className, text }: TransResultProps) {
  if (text) {
    return (
      <div className="w-full p-4 border border-transparent rounded-md md:rounded-l-none bg-gray-200 text-xs md:text-sm">
        {text}
      </div>
    );
  }

  if (isMobile) return;

  return (
    <div
      className={classNames(
        'w-full p-4 border border-transparent rounded-md md:rounded-l-none bg-gray-200',
        className
      )}
    >
      <div className="text-xs text-gray-400 select-none">⏎ 发送 / ⌘⏎ 换行</div>
    </div>
  );
}
