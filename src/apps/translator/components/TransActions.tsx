import { isMobile } from 'react-device-detect';

import Button from '@/components/base/Button';

export type TransTextInputProps = {
  loading?: boolean;
  onSubmit: () => unknown;
  onCancel: () => unknown;
  onClear: () => unknown;
};

export default function TransActions({
  loading,
  onSubmit,
  onCancel,
  onClear,
}: TransTextInputProps) {
  if (!isMobile) return;

  if (loading) {
    return (
      <Button className="w-full" type="danger" onClick={onCancel}>
        停止
      </Button>
    );
  }

  return (
    <div className="md:hidden flex space-x-4">
      <Button className="w-1/2" type="primary" onClick={onSubmit}>
        翻译一下
      </Button>
      <Button className="w-1/2" onClick={onClear}>
        清空
      </Button>
    </div>
  );
}
