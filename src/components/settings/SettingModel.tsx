import type { PropsWithChildren } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

import Dialog from '../base/Dialog';
import TippyButton from '../base/TippyButton';
import SettingSelector from './SettingSelector';
import SettingMobileSelector from './SettingMobileSelector';

export type SettingsModelProps = PropsWithChildren<{
  open: boolean;
  catalogItems: string[];
  catalogIcons: JSX.Element[];
  className?: string;
  selected: string;
  showConfirm?: boolean;
  showClose?: boolean;
  onSelect: (selected: string) => void;
  onConfirm?: () => void;
  onClose: () => void;
}>;

export default function SettingsModel({
  open,
  selected,
  catalogItems,
  catalogIcons,
  children,
  className = '',
  showClose = true,
  showConfirm,
  onSelect,
  onConfirm,
  onClose,
}: SettingsModelProps) {
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <div className="absolute top-4 right-4 flex sm:right-6">
        {showConfirm && (
          <TippyButton
            tooltip="确定"
            onClick={onConfirm}
            icon={<CheckIcon className="w-6 h-6 text-gray-500" />}
            className="hover:bg-gray-200 active:bg-gray-300"
          />
        )}
        {showClose && (
          <TippyButton
            tooltip="取消"
            onClick={onClose}
            icon={<XMarkIcon className="w-6 h-6 text-gray-500" />}
            className="hover:bg-gray-200 active:bg-gray-300"
          />
        )}
      </div>
      <div className="sm:h-96 h-150 flex sm:flex-row space-y-3 sm:space-y-0 flex-col sm:justify-center pt-5 sm:pt-0">
        <div className="relative block sm:hidden pl-4 sm:pl-0 w-fit">
          <SettingMobileSelector
            selected={selected}
            catalogItems={catalogItems}
            onSelect={onSelect}
          />
        </div>
        <div className="bg-gray-100 w-44 py-6 hidden sm:block min-w-44">
          <SettingSelector
            selected={selected}
            onSelect={onSelect}
            catalogItems={catalogItems}
            catalogIcons={catalogIcons}
          />
        </div>
        <div className="w-full sm:pl-6 sm:pr-7 px-4 bg-white">{children}</div>
      </div>
    </Dialog>
  );
}
